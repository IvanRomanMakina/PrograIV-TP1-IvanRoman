import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-validador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.scss']
})
export class ValidadorComponent {
  private supabase: SupabaseClient;
  codigoManual: string = '';
  mensajeEstado: string = '';
  esExito: boolean = false;
  isScanning: boolean = false;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async validarCodigo(codigo: string) {
    if (!codigo) return;

    try {
      // Parsear el JSON del ticket o buscar ID de reserva
      let datosTicket;
      try {
        datosTicket = JSON.parse(codigo);
      } catch (e) {
        // Si no es un JSON, tratamos el texto como ID de reserva directo o código alfanumérico
        datosTicket = { id: codigo };
      }

      // Consultar en la base de datos si la reserva existe y está activa
      const { data, error } = await this.supabase
        .from('bookings')
        .select('*')
        .eq('id', datosTicket.id || codigo)
        .single();

      if (error || !data) {
        this.mensajeEstado = ' Entrada inválida o no encontrada en el sistema.';
        this.esExito = false;
        return;
      }

      if (data.utilizado) {
        this.mensajeEstado = ' ATENCIÓN: Esta entrada ya fue utilizada previamente.';
        this.esExito = false;
        return;
      }

      // Marcar entrada como utilizada para evitar reingresos
      await this.supabase
        .from('bookings')
        .update({ utilizado: true })
        .eq('id', data.id);

      this.mensajeEstado = ` ¡Acceso Permitido! Asientos: ${data.items ? data.items.join(', ') : 'General'}`;
      this.esExito = true;
      this.codigoManual = '';

    } catch (err) {
      console.error('Error al validar:', err);
      this.mensajeEstado = ' Error de conexión al validar el ticket.';
      this.esExito = false;
    }
  }

  onManualSubmit() {
    this.validarCodigo(this.codigoManual);
  }
}