
import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
  // providers: [EventoService]
})
export class EventoComponent implements OnInit {
  modalRef!: BsModalRef;

  public eventos: Evento[] = [];

  public eventosFiltrados: Evento[] = [];

  public exibirImagem1: boolean = true;
  public exibirImagem2: boolean = true;
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
    this.GetEventos();

    // setTimeout(() => {
    //  //spinner 5 secodns delay
    //},5000);
  }


  public ChangeImage(): void {
    this.exibirImagem2 = !this.exibirImagem2;

  }

  public alterarImagem(): void {
    this.exibirImagem1 = !this.exibirImagem1;
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

  public GetEventos(): void {
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
      

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Evento excluido com sucesso!', 'Evento Excluido!');
  }

  decline(): void {
    this.modalRef?.hide();
  }

}
