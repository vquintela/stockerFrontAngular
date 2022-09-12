import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }
  /**
   * 
   * @param forma
   * Función que se suscribe al servicio y le envía el formulario
   * Si funciona OK redirecciona a un dashboard
   * Sino retroalimenta con un error
   */
  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, null, forma.value.email, null, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe((resp: any) => {
        this.router.navigate(['/dashboard']);
      }, (err) => {
        console.log(err);
      });
  }
}


