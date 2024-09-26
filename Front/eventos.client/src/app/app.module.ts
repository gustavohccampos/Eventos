import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventoComponent } from './components/evento/evento.component';
import { PalestranteComponent } from './components/palestrante/palestrante.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
//
import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared/titulo/titulo.component';
//
import { EventoService } from './services/evento.service';
//
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EventoDetalheComponent } from './components/evento/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/evento/evento-lista/evento-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { DateTimeFormatPipe } from './helpers/DateTimeFormatPipe.pipe';
import { DateTimeConvertPipe } from './helpers/DateTimeConvertPipe.pipe';
import { Constants } from './util/Constants';



registerLocaleData(localePt);



@NgModule({
  declarations: [
    AppComponent,
    DateTimeFormatPipe,
    DateTimeConvertPipe,
    EventoComponent,
    NavComponent,
    TituloComponent,
    PalestranteComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    EventoDetalheComponent,
    EventoListaComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar:true,
    }),
    NgxSpinnerModule.forRoot({
      type: 'ball-scale-multiple'
    }),
    ReactiveFormsModule,


  ],
  providers:
    [EventoService,
      { provide: LOCALE_ID, useValue: Constants.LOCALE },
    ],
     

  bootstrap:
    [AppComponent],

  schemas:
    [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
