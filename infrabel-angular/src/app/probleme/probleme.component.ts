import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { withPreloading } from '@angular/router';
import { EMPTY, Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';
import { FormatDataService, TimeFormat } from '../services/format-data.service';
import { IncidentService } from '../services/incident.service';
import { LigneArretService } from '../services/ligne-arret.service';
import { PonctualiteJ1Service } from '../services/ponctualite-j1.service';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.scss']
})
export class ProblemeComponent {

  constructor(
    private _ligneArretService: LigneArretService,
    private _ponctualiteService: PonctualiteJ1Service,
    private _incidentService: IncidentService,
    private _format : FormatDataService
    ){}

  mycontrol = new FormControl
  departControl = new FormControl();

  options : string[]=[]
  filterredOption : Observable<string[]> = EMPTY

  showResult = false

  averageDelayArrivalInSeconds: number = 0
  averageDelayArrivalInTime: TimeFormat = {hours: 0, minutes: 0, seconds: 0}
  averageDelayDepartureInSeconds: number = 0
  averageDelayDepartureInTime: TimeFormat = {hours: 0, minutes: 0, seconds: 0}

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

  // Button onClick
  getData(){
    this.getAverageDelay()
    this.getByPlace()
    this.showResult = true
  }

  // Moyenne de retard / arrêt
  getAverageDelay(){
    this._ponctualiteService.getPonctualityByStop(this.departControl.value).subscribe({
      next: (data) => {
        this.averageDelayArrivalInSeconds = 0
        this.averageDelayDepartureInSeconds = 0
        let iterations = 0

        // moyenne en secondes
        for(let obj of data){
          this.averageDelayArrivalInSeconds += obj.retard_arr
          this.averageDelayDepartureInSeconds += obj.retard_dep
          iterations ++
        }

        this.averageDelayArrivalInSeconds = this.averageDelayArrivalInSeconds / iterations
        this.averageDelayDepartureInSeconds = this.averageDelayDepartureInSeconds / iterations

        // formattage de la moyenne en heures, minutes et secondes
        this.averageDelayArrivalInTime = this._format.formatTime(this.averageDelayArrivalInSeconds)
        this.averageDelayDepartureInTime = this._format.formatTime(this.averageDelayDepartureInSeconds)
      },
      error: (err) => {
        console.log("Erreur: " + err);
      }
    })
  }

  // Incidents / arrêt
  getByPlace(){
    this._incidentService.getIncidentByPlace(this.departControl.value).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => {
        console.log("Erreur: " + err);
      }
    })
  }
}
