import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable()
export class EventoService {

  baseURL = "http://localhost:5045/api/Evento";
  constructor(private http: HttpClient) { }

public  getEventos(): Observable<Evento[]>{
  return this.http
    .get<Evento[]>(this.baseURL)
    .pipe(take(1));
  }

public  getEventoById(id:number): Observable<Evento> {
  return this.http
    .get<Evento>(`${this.baseURL}/${id}`)
    .pipe(take(1));
  }

 public getEventoByTema(tema:string ): Observable<Evento[]> {
   return this.http
     .get<Evento[]>(`${this.baseURL}/tema/${tema}`)
     .pipe(take(1));
  }

  public post(evento: Evento): Observable<Evento> {
    return this.http
      .post<Evento>(this.baseURL, evento)
      .pipe(take(1));
  }

  public put(evento:Evento): Observable<Evento> {
    return this.http
      .put<Evento>(`${this.baseURL}/${evento.id}`, evento)
      .pipe(take(1));
  }

  public deleteEvento(id: number): Observable<any>{
    return this.http
      .delete(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

}
