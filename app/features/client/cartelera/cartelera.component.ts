import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService, Movie } from '../../../core/services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartelera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.scss']
})
export class CarteleraComponent implements OnInit {
  peliculaDestacadas: Movie[] = [];
  peliculas: Movie[] = [];
  peliculasFiltradas: Movie[] = [];
  proximosEstrenos: Movie[] = [];

  // Filtros
  busquedaTexto: string = '';
  generoSeleccionado: string = 'Todos';
  listaGeneros: string[] = ['Todos', 'Acción', 'Ciencia Ficción', 'Terror', 'Drama', 'Comedia', 'Animación'];

  isLoading = true;

  constructor(private movieService: MovieService, private router: Router) {}

  async ngOnInit() {
    try {
      const data = await this.movieService.getMovies();
      
      // Separar por secciones
      this.peliculaDestacadas = [...data]
        .sort((a, b) => (b.ventas_totales || 0) - (a.ventas_totales || 0))
        .slice(0, 3);

      this.proximosEstrenos = data.filter(p => p.es_proximamente);
      this.peliculas = data.filter(p => !p.es_proximamente);
      this.peliculasFiltradas = this.peliculas;
    } catch (err) {
      console.error('Error al cargar películas:', err);
    } finally {
      this.isLoading = false;
    }
  }

  filtrar() {
    this.peliculasFiltradas = this.peliculas.filter(p => {
      const coincideTexto = p.titulo.toLowerCase().includes(this.busquedaTexto.toLowerCase());
      const coincideGenero = this.generoSeleccionado === 'Todos' || p.generos.includes(this.generoSeleccionado);
      return coincideTexto && coincideGenero;
    });
  }

  seleccionarGenero(genero: string) {
    this.generoSeleccionado = genero;
    this.filtrar();
  }

  activarAlerta(movie: Movie) {
    alert(`¡Alerta activada para "${movie.titulo}"! Te notificaremos cuando las entradas estén disponibles.`);
  }

  irACompra(movieId: number) {
    this.router.navigate(['/comprar', movieId]);
  }
}