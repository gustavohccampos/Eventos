import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable()
export class EventoService {

  baseURL = "http://localhost:5045/api/Evento";
  constructor(private http: HttpClient) { }

public  getEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.baseURL);
  }

public  getEventoById(id:number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`);
  }

 public getEventoByTema(tema:string ): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`);
  }
}
