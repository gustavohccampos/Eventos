import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent implements OnInit {


  public eventos: any = [];

  public eventosFiltrados: any = [];
  exibirImagem1: boolean = false;
  exibirImagem2: boolean = false;
  larguraImagem: number = 150;
  margemImagem: number = 200;


  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.GetEventos();
  }


  ChangeImage() {
    this.exibirImagem2 = !this.exibirImagem2;

  }

  alterarImagem() {
    this.exibirImagem1 = !this.exibirImagem1;
  }



  private _filtroLista: string = "";

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
  }


  filtrarEvento(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLowerCase();
    return this.eventos.filter(
      (evento: { nome: string, tema: string }) =>
        evento.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  public GetEventos(): void {
    this.http.get('http://localhost:5045/api/Evento').subscribe(
      response => {
        this.eventos = response,
          this.eventosFiltrados = this.eventos;
      },
      error => console.log(error),
    );
  }

}
