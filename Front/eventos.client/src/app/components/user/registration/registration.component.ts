import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '../../../helpers/validator-field';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

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
      nome: ['',
        [Validators.minLength(4),
        Validators.maxLength(50),
        Validators.required
        ]],
      sobrenome: ['',
        [Validators.minLength(4),
        Validators.maxLength(50),
        Validators.required
        ]],
      email: ['',
        [Validators.required,
        Validators.email]],
      username: ['', Validators.required],
      password: ['',
        [Validators.required, Validators.minLength(6)]],  // Colocar os validadores em um array
      confirmPassword: ['',
        [Validators.required, Validators.minLength(6)]],  // Colocar os validadores em um array
      termsCheck: [false, Validators.requiredTrue],  // Usar 'false' como valor inicial para o checkbox e 'requiredTrue'

    }, formOptions);
  }

  resetForm(): void {
    this.form.reset();
  }

}
