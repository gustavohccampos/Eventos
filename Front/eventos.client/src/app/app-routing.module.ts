import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent } from './components/evento/evento.component';
import { PalestranteComponent } from './components/palestrante/palestrante.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';


const routes: Routes = [
  { path: 'eventos', component: EventoComponent },
  { path: 'palestrantes', component: PalestranteComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '', redirectTo: 'dashboard', pathMatch:'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch:'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
