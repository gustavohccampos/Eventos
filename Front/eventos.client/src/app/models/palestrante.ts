import { Evento } from "./evento";
import { RedeSocial } from "./rede-social";

export interface Palestrante {
  id: number;
  nome: string;
  miniCurriculo: string;
  imagemURL: string;
  email: string;
  telefone: string;


  //FK
  redesSociais: RedeSocial[];
  palestrantesEventos: Evento[];
}
