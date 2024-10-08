import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../../../models/evento';
import { EventoService } from '../../../services/evento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrl: './evento-lista.component.css'
})
export class EventoListaComponent implements OnInit{

  modalRef!: BsModalRef;

  public eventos: Evento[] = [];

  public eventosFiltrados: Evento[] = [];

  public exibirImagem1: boolean = true;
  public exibirImagem2: boolean = true;
  private larguraImagem: number = 150;
  private margemImagem: number = 200;
  private filtroListado: string = "";
  public eventoId: number =0;


  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.spinner.show();
    this.getEventos();

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


  openModal(event:any, template: TemplateRef<void>, eventoId:number) {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
        if (result.message === 'Deletado') {
          this.toastr.success('Evento excluido com sucesso!', 'Evento Excluido!');
          this.getEventos();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar excluir o evento ${this.eventoId}`, 'Erro!');
      },
    ).add(() => () => this.spinner.hide());
  
  }

  decline(): void {
    this.modalRef?.hide();
  }


  detalheEvento(id:number): void {
    this.router.navigate([`eventos/detalhe/${id}`])
  }

}
