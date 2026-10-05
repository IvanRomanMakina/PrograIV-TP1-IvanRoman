import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../core/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async onSubmit() {
    try {
      await this.supabase.login(this.email, this.password);
      // Redirigir a la cartelera después de loguearse
      this.router.navigate(['/']); 
    } catch (error: any) {
      this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
    }
  }
}