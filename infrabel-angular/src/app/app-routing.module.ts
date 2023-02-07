import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PonctualiteComponent } from './ponctualite/ponctualite.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'ponctualite', component:PonctualiteComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
