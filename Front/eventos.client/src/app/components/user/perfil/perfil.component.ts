import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControlOptions, Validators } from '@angular/forms';
import { ValidatorField } from '../../../helpers/validator-field';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {


  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validation();

  }

  public validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword')
    };

    this.form = this.fb.group({
      titulo: ['', Validators.required],
      nome: ['', [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
      sobrenome: ['', [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      funcao: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, formOptions);
  }

  resetForm(): void {
    this.form.reset();
  }

}
