import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistroComponent } from './features/auth/registro/registro.component';
import { CarteleraComponent } from './features/client/cartelera/cartelera.component';
import { SalaComponent } from './features/client/sala/sala.component';
import { CandyComponent } from './features/client/candy/candy.component';
import { TicketComponent } from './features/client/ticket/ticket.component';
import { ValidadorComponent } from './features/employee/validador/validador.component';
import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: CarteleraComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'comprar/:id', component: SalaComponent },
  { path: 'candy/:id', component: CandyComponent },
  { path: 'ticket', component: TicketComponent },
  { path: 'empleado/validador', component: ValidadorComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: '**', redirectTo: '' }
];