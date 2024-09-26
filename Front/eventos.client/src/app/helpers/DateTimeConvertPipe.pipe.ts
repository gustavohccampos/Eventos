import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../util/Constants';

@Pipe({
  name: 'DateTimeConvert'
})

export class DateTimeConvertPipe extends DatePipe implements PipeTransform {

  // Configurando o locale pt-BR no construtor
  constructor() {
    super(Constants.LOCALE); // Define o locale como pt-BR para data brasileira
  }

  override transform(value: any, args?: any): any {
    if (!value) return value;

    // Se a data estiver no formato brasileiro "DD/MM/YYYY HH:mm:ss"
    if (typeof value === 'string' && value.includes('/')) {
      // Quebrar a string para formatar corretamente
      const partes = value.split(' ');
      const dataPartes = partes[0].split('/');
      const horaPartes = partes[1]?.split(':') || ['00', '00', '00']; // Para garantir que haja uma hora

      // Criando a data no formato ISO (YYYY-MM-DDTHH:mm:ss) para conversão correta
      const dataISO = `${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}T${horaPartes[0]}:${horaPartes[1]}:${horaPartes[2]}`;

      // Usando o DatePipe nativo para transformar a data
      return super.transform(dataISO, Constants.DATE_TIME_FMT); // Constants.DATE_TIME_FMT deve ser algo como 'dd/MM/yyyy HH:mm:ss'
    }

    // Caso o valor já esteja no formato Date ou outro formato suportado
    return super.transform(value, Constants.DATE_TIME_FMT);
  }
}
