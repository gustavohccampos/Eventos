import { Lote } from "./lote";
import { Palestrante } from "./palestrante";
import { RedeSocial } from "./rede-social";

export interface Evento {
  id: number; 
  nome: string; 
  local: string; 
  dataEvento:Date;
  tema: string;
  qtdPessoas: number;
  imagemURL: string;
  dataCadastro: Date;
  email: string;
  telefone: string;

  //FK
  lotes: Lote[];
  redesSociais: RedeSocial[]; 
  palestrantesEventos: Palestrante[];  
     

}
