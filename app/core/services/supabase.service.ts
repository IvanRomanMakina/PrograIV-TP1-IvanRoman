import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Método para registrar usuario con los datos extra requeridos
  async registrarUsuario(email: string, password: string, userData: any) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Guardar los datos extra (ojos, sangre, vacaciones, etc.) en la tabla profiles
    if (data.user) {
      const { error: profileError } = await this.supabase.from('profiles').insert([
        { 
          id: data.user.id, 
          ...userData 
        }
      ]);
      if (profileError) throw profileError;
    }
    return data;
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  }

  async logout() {
    return await this.supabase.auth.signOut();
  }
}