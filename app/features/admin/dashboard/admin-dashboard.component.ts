import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  private supabase: SupabaseClient;
  totalVentas: number = 0;
  totalEntradasVendidas: number = 0;
  logsAuditoria: any[] = [];
  isLoading: boolean = true;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async ngOnInit() {
    await this.cargarDatosAdmin();
  }

  async cargarDatosAdmin() {
    try {
      // 1. Obtener reservas/ventas
      const { data: bookings, error } = await this.supabase
        .from('bookings')
        .select('*');

      if (error) throw error;

      if (bookings) {
        this.totalVentas = bookings.reduce((acc, curr) => acc + (curr.total || 0), 0);
        this.totalEntradasVendidas = bookings.reduce((acc, curr) => {
          return acc + (curr.items ? curr.items.length : 0);
        }, 0);
        this.logsAuditoria = bookings;
      }
    } catch (err) {
      console.error('Error cargando panel admin:', err);
    } finally {
      this.isLoading = false;
    }
  }

  exportarPDF() {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Reporte Oficial de Ventas - Cine Burga', 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Fecha de emision: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Recaudacion Total: $${this.totalVentas}`, 14, 40);
    doc.text(`Entradas Vendidas: ${this.totalEntradasVendidas}`, 14, 50);

    doc.text('Historial de Transacciones / Auditoria:', 14, 65);
    
    let y = 75;
    this.logsAuditoria.slice(0, 10).forEach((log, index) => {
      doc.setFontSize(10);
      doc.text(`${index + 1}. ID: ${log.id.slice(0, 8)}... | Total: $${log.total} | Fecha: ${new Date(log.created_at || '').toLocaleDateString()}`, 14, y);
      y += 10;
    });

    doc.save('reporte-ventas-cine.pdf');
  }
}