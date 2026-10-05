import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export interface Movie {
  id: number;
  titulo: string;
  duracion_minutos: number;
  sinopsis: string;
  imagen_url: string;
  restriccion_edad: number; // 0, 13, 18
  generos: string[];
  es_preventa?: boolean;
  precio_preventa?: number;
  precio_normal?: number;
  fecha_estreno?: string;
  es_proximamente?: boolean;
  ventas_totales?: number;
  promedio_calificacion?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Obtener catálogo completo de películas
  async getMovies(): Promise<Movie[]> {
    const { data, error } = await this.supabase
      .from('movies')
      .select('*');
    if (error) throw error;
    return data || [];
  }

  // Obtener Top 3 más vendidas
  async getTop3Movies(): Promise<Movie[]> {
    const { data, error } = await this.supabase
      .from('movies')
      .select('*')
      .order('ventas_totales', { ascending: false })
      .limit(3);
    if (error) throw error;
    return data || [];
  }

  // Activar alerta para películas de "Próximamente"
  async activarAlertaEstreno(movieId: number, userId: string) {
    const { data, error } = await this.supabase
      .from('movie_alerts')
      .insert([{ movie_id: movieId, user_id: userId }]);
    if (error) throw error;
    return data;
  }
}