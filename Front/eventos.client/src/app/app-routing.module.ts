import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoComponent } from './components/evento/evento.component';
import { EventoDetalheComponent } from './components/evento/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/evento/evento-lista/evento-lista.component';

import { PalestranteComponent } from './components/palestrante/palestrante.component';

import { ContatosComponent } from './components/contatos/contatos.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { PerfilComponent } from './components/user/perfil/perfil.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';


const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  { path: 'user/perfil', component: PerfilComponent },
  { path: 'eventos', redirectTo: 'eventos/lista' },
  {
    path: 'eventos', component: EventoComponent,
    children: [
      { path: 'detalhe/:id', component: EventoDetalheComponent },
      { path: 'detalhe', component: EventoDetalheComponent },
      { path: 'lista', component: EventoListaComponent },
    ]
  },
  { path: 'palestrantes', component: PalestranteComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch:'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch:'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
