import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

export interface CandyItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

@Component({
  selector: 'app-candy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candy.component.html',
  styleUrls: ['./candy.component.scss']
})
export class CandyComponent implements OnInit {
  movieId!: number;
  asientosSeleccionados: string[] = [];

  productos: CandyItem[] = [
    { id: 1, nombre: 'Combo Gigante', descripcion: 'Pochoclos grandes + 2 Gaseosas grandes', precio: 8500, imagen: 'assets/combo1.jpg', cantidad: 0 },
    { id: 2, nombre: 'Combo Pareja', descripcion: 'Pochoclos medianos + 2 Gaseosas + 1 Bonafide', precio: 11000, imagen: 'assets/combo2.jpg', cantidad: 0 },
    { id: 3, nombre: 'Nachos con Cheddar', descripcion: 'Nachos crocantes con salsa de queso caliente', precio: 6000, imagen: 'assets/nachos.jpg', cantidad: 0 },
    { id: 4, nombre: 'Gaseosa 500ml', descripcion: 'Línea Coca-Cola', precio: 3000, imagen: 'assets/gaseosa.jpg', cantidad: 0 }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    const asientosParam = this.route.snapshot.queryParamMap.get('asientos');
    if (asientosParam) {
      this.asientosSeleccionados = JSON.parse(asientosParam);
    }
  }

  cambiarCantidad(producto: CandyItem, delta: number) {
    producto.cantidad = Math.max(0, producto.cantidad + delta);
  }

  calcularTotalCandy(): number {
    return this.productos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  }

  finalizarCompra() {
    const candyItems = this.productos.filter(p => p.cantidad > 0);
    this.router.navigate(['/ticket'], {
      queryParams: {
        movieId: this.movieId,
        asientos: JSON.stringify(this.asientosSeleccionados),
        candy: JSON.stringify(candyItems)
      }
    });
  }
}