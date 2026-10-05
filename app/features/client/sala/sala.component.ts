import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'accessible' | 'vip';
  status: 'available' | 'selected' | 'occupied';
}

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss']
})
export class SalaComponent implements OnInit {
  movieId!: number;
  asientos: Seat[][] = [];
  asientosSeleccionados: Seat[] = [];
  precioBase: number = 4500;

  private readonly rows = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'];

  constructor(private route: ActivatedRoute, private router: Router, private bookingService: BookingService) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.generarMapaAsientos();
  }

  generarMapaAsientos() {
    const layout: Seat[][] = [];

    this.rows.forEach(rowLetter => {
      const rowSeats: Seat[] = [];
      const isAccessibleRow = rowLetter === 'J' || rowLetter === 'K';
      const isVipRow = rowLetter === 'R' || rowLetter === 'S' || rowLetter === 'T';

      for (let i = 1; i <= 14; i++) {
        let type: 'standard' | 'accessible' | 'vip' = 'standard';

        if (isVipRow) {
          type = 'vip';
        } else if (isAccessibleRow && i >= 3 && i <= 12) {
          type = 'accessible';
        }

        rowSeats.push({
          id: `${rowLetter}-${i}`,
          row: rowLetter,
          number: i,
          type: type,
          status: 'available'
        });
      }
      layout.push(rowSeats);
    });

    this.asientos = layout;
  }

  seleccionarAsiento(seat: Seat) {
    if (seat.status === 'occupied') return;

    if (seat.status === 'selected') {
      seat.status = 'available';
      this.asientosSeleccionados = this.asientosSeleccionados.filter(s => s.id !== seat.id);
    } else {
      seat.status = 'selected';
      this.asientosSeleccionados.push(seat);
    }
  }

  calcularTotal(): number {
    return this.asientosSeleccionados.reduce((acc, seat) => {
      if (seat.type === 'vip') return acc + (this.precioBase * 1.4); // 40% recargo VIP
      return acc + this.precioBase;
    }, 0);
  }

  continuarAlCandy() {
    // Guardar selección temporalmente y pasar al Candy Bar
    this.router.navigate(['/candy', this.movieId], { 
      queryParams: { asientos: JSON.stringify(this.asientosSeleccionados.map(s => s.id)) } 
    });
  }
}