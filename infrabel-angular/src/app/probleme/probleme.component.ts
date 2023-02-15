import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { withPreloading } from '@angular/router';
import { EMPTY, Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';
import { LigneArretService } from '../services/ligne-arret.service';
import { PonctualiteJ1Service } from '../services/ponctualite-j1.service';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.scss']
})
export class ProblemeComponent {

  constructor(private _ligneArretService: LigneArretService, private _ponctualiteService: PonctualiteJ1Service){}

  options : string[]=[]

  mycontrol = new FormControl

  filterredOption : Observable<string[]> = EMPTY

  departControl = new FormControl();
  showResult = false

  averageDelayArrival: number = 0
  averageDelayDeparture: number = 0
    //filtre recherche
  ngOnInit(): void {
    this._ligneArretService.getStops().subscribe( {
      next: (data) => {
        let temptab = data

        for(let obj of temptab){
          this.options.push(obj.nom_arret)
        }
        this.filterredOption = this.mycontrol.valueChanges.pipe(
          startWith(''),
          map(value=>this._filter(value))
        )
      },
      error: (err) => {
        console.log("Erreur: " + err);
      }
    })
  }
  private _filter(value:string){
    const filtervalue=value.toLowerCase()
    return this.options.filter(option=>option.toLocaleLowerCase().includes(filtervalue))
  }
  getData(){
    this.showResult = true

    this._ponctualiteService.getPonctualityByStop(this.departControl.value).subscribe({
      next: (data) => {
        this.averageDelayArrival = 0
        this.averageDelayDeparture = 0
        let iterations = 0

        for(let obj of data){
          this.averageDelayArrival += obj.retard_arr
          this.averageDelayDeparture += obj.retard_dep
          iterations ++
        }

        this.averageDelayArrival = this.averageDelayArrival / iterations
        this.averageDelayDeparture = this.averageDelayDeparture / iterations
      },
      error: (err) => {
        console.log("Erreur: " + err);
      }
    })
  }

}
