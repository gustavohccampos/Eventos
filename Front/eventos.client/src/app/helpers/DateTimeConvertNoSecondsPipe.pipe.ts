import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../util/Constants';

@Pipe({
  name: 'DateTimeConvertNoSeconds'
})

export class DateTimeConvertNoSecondsPipe extends DatePipe implements PipeTransform {

  // Configurando o locale pt-BR no construtor
  constructor() {
    super(Constants.LOCALE); // Define o locale como pt-BR para data brasileira
  }

  override transform(value: any, args?: any): any {
    if (!value) return value;
    // Se a data estiver no formato brasileiro "DD/MM/YYYY HH:mm:ss"
    if (typeof value === 'string' && value.includes('/')) {
      const partes = value.split(' ');
      const dataPartes = partes[0].split('/');
      // Garantindo que temos uma hora válida
      const horaPartes = partes[1]?.split(':') || ['00', '00'];
      // Criando a data no formato ISO (YYYY-MM-DDTHH:mm) para conversão correta
      const dataISO = `${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}T${horaPartes[0]}:${horaPartes[1]}`;
      // Retornar a data no formato ISO
      return dataISO; // Alterado para retornar a data no formato ISO
    }
    // Caso o valor já esteja no formato Date ou outro formato suportado
    return super.transform(value, Constants.DATE_TIME_FMT);
  }
}
