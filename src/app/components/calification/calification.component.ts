import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calification',
  templateUrl: './calification.component.html',
  styleUrls: ['./calification.component.scss']
})
export class CalificationComponent {

  form!: FormGroup;
  userID!: number;
  formUser!: UserData;
  score: number;
  options: number[] = Array.from({length: 11}, (_, i) => i); 
  
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      Score: ['', Validators.required],
    })

    this.score = 0;
  }

  ngOnInit(): void {
    this.userID = parseInt(sessionStorage.getItem('id')!, 10);
    this.userService.getUserID(this.userID).subscribe( (score: UserData) => {
      this.form.patchValue(score);
      this.formUser = score;
      this.score = score.calification.score;
    })
  }

  vote(){
    const score: UserData = {
      idUser: this.userID,
      cc: this.formUser.cc,
      name: this.formUser.name,
      email: this.formUser.email,
      password: this.formUser.password,
      role: this.formUser.role,
      calification: {
        idUser: this.userID,
        score: this.form.get('Score')!.value
      }
    };
    this.userService.editUser(score).subscribe(
      (res) => {
        Swal.fire({
          title: "¡Excelente!",
          text: "Realizaste tu calificación",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema, intenta de nuevo",
          icon: "error",
        });
      }
    );
  }

}
