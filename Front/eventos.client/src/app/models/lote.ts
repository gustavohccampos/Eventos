import { Evento } from "./evento";

export interface Lote {
  id: number;
  nome: string;
  preco: number;
  dataInicio: Date;
  dataFim: Date;
  quantidade: number;
  evento: Evento;
}
