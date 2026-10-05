import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @ViewChild('qrcodeCanvas', { static: true }) qrcodeCanvas!: ElementRef;

  movieId!: number;
  asientos: string[] = [];
  candyItems: any[] = [];
  qrCodeDataUrl: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.queryParamMap.get('movieId'));
    const asientosParam = this.route.snapshot.queryParamMap.get('asientos');
    const candyParam = this.route.snapshot.queryParamMap.get('candy');

    if (asientosParam) this.asientos = JSON.parse(asientosParam);
    if (candyParam) this.candyItems = JSON.parse(candyParam);

    this.generarQR();
  }

  async generarQR() {
    const datosTicket = JSON.stringify({
      peliculaId: this.movieId,
      asientos: this.asientos,
      fecha: new Date().toISOString()
    });

    try {
      this.qrCodeDataUrl = await QRCode.toDataURL(datosTicket, { width: 200, margin: 1 });
    } catch (err) {
      console.error('Error generando QR:', err);
    }
  }

  volverInicio() {
    this.router.navigate(['/']);
  }
}