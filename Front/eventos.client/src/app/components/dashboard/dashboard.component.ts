import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  public eventos: Evento[] = [];


  public eventosFiltrados: Evento[] = [];

  public exibirImagem2: boolean = false;
  private larguraImagem: number = 150;
  private margemImagem: number = 200;
  private filtroListado: string = "";


  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }


  ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }


  public ChangeImage(): void {
    this.exibirImagem2 = !this.exibirImagem2;

  }


  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
  }


  public filtrarEvento(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLowerCase();
    return this.eventos.filter(
      (evento: { nome: string, tema: string }) =>
        evento.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
      this.spinner.hide();
      this.toastr.error('Erro ao carregar Eventos!', 'Erro!');
    },
      complete: () => this.spinner.hide()
    });
  }
      


}
