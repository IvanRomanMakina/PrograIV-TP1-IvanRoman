import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../core/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  // Datos requeridos
  email = '';
  password = '';
  nombre = '';
  apellido = '';
  // Evitamos el DatePicker nativo separando en variables para cumplir con UX
  nacimientoDia = '';
  nacimientoMes = '';
  nacimientoAnio = '';
  tipoSangre = '';
  colorOjos = '';
  diasVacaciones: number = 0;

  errorMessage = '';
  isLoading = false;

  constructor(private supabase: SupabaseService, private router: Router) {}

  async onRegister() {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      const fechaNacimiento = `${this.nacimientoAnio}-${this.nacimientoMes}-${this.nacimientoDia}`;
      
      const userData = {
        nombre: this.nombre,
        apellido: this.apellido,
        fecha_nacimiento: fechaNacimiento,
        tipo_sangre: this.tipoSangre,
        color_ojos: this.colorOjos,
        dias_vacaciones: this.diasVacaciones
      };

      await this.supabase.registrarUsuario(this.email, this.password, userData);
      alert('¡Registro exitoso! Tienes un cupón del 20% de descuento en tu primera compra.');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Error al registrar usuario.';
    } finally {
      this.isLoading = false;
    }
  }
}