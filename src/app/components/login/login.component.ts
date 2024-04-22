import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;
  role!: number;

  constructor(private fb: FormBuilder, private loginService: LoginService, private userService: UserService,private router: Router) {
    this.form = this.fb.group({
      Email: ['user@example.com', Validators.required],
      Password: ['qwerty123', Validators.required]
    })
  }

  login(){
    if (this.form.valid) {
      const email = this.form.get('Email')!.value;
      const password = this.form.get('Password')!.value;
      this.loginService.login(email, password).subscribe(
        (response) => {
          this
          sessionStorage.setItem('id', response);
          this.userService.getUserID(response).subscribe( data => {
            sessionStorage.setItem('role', data.role);
            this.role = parseInt(sessionStorage.getItem('role')!, 10);
            if(this.role == 1){ //Calificador
              this.router.navigateByUrl('/vote')
            }if(this.role == 2){ //Administrador
              this.router.navigateByUrl('/list')
            }if(this.role !== 1 && this.role !== 2){
              Swal.fire({
                title: "¡Error!",
                text: "Intenta de nuevo.",
                icon: "error",
              }).then(() => {
                sessionStorage.removeItem('role');
                this.router.navigate(['/login']);
              });
            }
          })
        },
        (error) => {
          console.error(error);
          Swal.fire({
            title: "¡Error!",
            text: "Usuario o contraseña incorrectas, intenta de nuevo.",
            icon: "error",
          });
        }
      );
    } else {
    }
  }

}
