import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export interface ShowTime {
  id: number;
  movie_id: number;
  sala_id: number;
  fecha_hora: string; // ISO String
  duracion_total: number; // Duración + 30 min de margen
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Verificar solapamiento de sala (Requerimiento: Duración + 30 min de margen)
  async verificarDisponibilidadSala(salaId: number, nuevaFechaHora: string, duracionPeliculaMin: number): Promise<boolean> {
    const nuevaFecha = new Date(nuevaFechaHora);
    const margenMinutos = 30;
    const duracionTotalMillis = (duracionPeliculaMin + margenMinutos) * 60000;
    const nuevoInicio = nuevaFecha.getTime();
    const nuevoFin = nuevoInicio + duracionTotalMillis;

    // Obtener funciones existentes para esa sala en la misma fecha
    const fechaStr = nuevaFecha.toISOString().split('T')[0];
    const { data: funciones, error } = await this.supabase
      .from('showtimes')
      .select('*')
      .eq('sala_id', salaId)
      .gte('fecha_hora', `${fechaStr}T00:00:00`)
      .lte('fecha_hora', `${fechaStr}T23:59:59`);

    if (error) throw error;
    if (!funciones) return true;

    // Comprobar solapamiento
    for (const func of funciones) {
      const inicioExistente = new Date(func.fecha_hora).getTime();
      const finExistente = inicioExistente + (func.duracion_total * 60000);

      // Si hay superposición de rangos horarios
      if (nuevoInicio < finExistente && nuevoFin > inicioExistente) {
        return false; // Sala ocupada / Solapamiento detectado
      }
    }

    return true; // Disponible
  }

  // Registrar compra de entradas y actualizar puntos de fidelidad (1 punto por peso)
  async confirmarCompra(userId: string, totalPagar: number, entradas: any[]) {
    // 1. Guardar la reserva
    const { data: reserva, error: errorReserva } = await this.supabase
      .from('bookings')
      .insert([{ user_id: userId, total: totalPagar, items: entradas }])
      .select()
      .single();

    if (errorReserva) throw errorReserva;

    // 2. Actualizar puntos de fidelidad en profiles
    const { data: profile } = await this.supabase
      .from('profiles')
      .select('puntos_fidelidad')
      .eq('id', userId)
      .single();

    const puntosActuales = profile?.puntos_fidelidad || 0;
    const nuevosPuntos = puntosActuales + Math.floor(totalPagar);

    await this.supabase
      .from('profiles')
      .update({ puntos_fidelidad: nuevosPuntos })
      .eq('id', userId);

    return reserva;
  }
}