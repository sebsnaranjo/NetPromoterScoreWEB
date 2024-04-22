import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CalificationComponent } from './components/calification/calification.component';
import { CalificationListComponent } from './components/calification-list/calification-list.component';

const routes: Routes = [
  {path: 'home', component: LoginComponent},
  {path: 'vote', component: CalificationComponent},
  {path: 'list', component: CalificationListComponent},

  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
