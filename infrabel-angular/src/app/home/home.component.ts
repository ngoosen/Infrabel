import { Component } from '@angular/core';
import { PonctualiteJ1Service } from '../services/ponctualite-j1.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private _service: PonctualiteJ1Service){}

  // Exemple de call d'API
  ngOnInit(){
    this._service.getOnePonctuality(3).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
