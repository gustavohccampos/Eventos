import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../../models/evento';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrl: './evento-detalhe.component.css'
})
export class EventoDetalheComponent implements OnInit{

  evento = {} as Evento;
  form!: FormGroup;
  constructor(private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService

  ){
    this.localeService.use('pt-br');
  }

  get f(): any {
    return this.form.controls;
  }

  formatDateForInput(dateString: string): string {
    const partes = dateString.split(' ');
    const dataPartes = partes[0].split('/');
    const horaPartes = partes[1]?.split(':') || ['00', '00'];
    return `${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}T${horaPartes[0]}:${horaPartes[1]}`; // Formato yyyy-MM-ddTHH:mm
  }



  public carregarEvento(): void {
    const eventoId = this.router.snapshot.paramMap.get('id');

    if (eventoId !== null)
    { //+ na frente converte para int
      this.spinner.show();
      this.eventoService.getEventoById(+eventoId).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento }
          this.form.patchValue(this.evento);
          console.log(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar evento.', 'Erro!');
          console.error(error);
        },
        () => { this.spinner.hide(); },
      );
     
    }
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
}

  ngOnInit(): void {
    
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema:['',
        [Validators.minLength(4),
          Validators.maxLength(50),
          Validators.required
        ]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['',
        [Validators.required,
          Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['',
        [Validators.required,
          Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  resetForm(): void {
    this.form.reset();
  }

  cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }



}


