import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrl: './evento-detalhe.component.css'
})
export class EventoDetalheComponent implements OnInit{

  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
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

}
