import { Component } from '@angular/core';
import { LigneArretService } from '../services/ligne-arret.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private _service: LigneArretService){}

  // Exemple de call d'API
  ngOnInit(){
    this._service.getStops().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
