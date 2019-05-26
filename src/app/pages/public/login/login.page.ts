import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage: string = '';
  validationMessages: any;

  constructor(
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });

    this.validationMessages = {
      email: [
        { type: 'required', message: 'Ingrese un Email.' },
        { type: 'pattern', message: 'Por favor, ingrese un Email válido.' }
      ],
      password: [
        { type: 'required', message: 'Ingrese una contraseña.' },
        {
          type: 'minlength',
          message: 'La contraseña debe tener al menos 5 caracteres.'
        }
      ]
    };

    let value = {
      email: 'lucianorarrua@gmail.com',
      password: 'comoencasa'
    }
    // this.loginUser(value) s
  }

  loginUser(value) {
    this.authenticationService.login(value).then(
      res => {
        this.errorMessage = '';
      },
      err => {
        this.errorMessage = this.firebaseAuthenticationService.getSpanishError(err);
      }
    );
  }
}
