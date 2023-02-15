import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { withPreloading } from '@angular/router';
import { EMPTY, Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';
import { FormatDataService, GroupedDataFormat, TimeFormat } from '../services/format-data.service';
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

  todaysDate : Date = new Date("2023-02-10")
  nbIncident: number = 0
  incidentGraph : GroupedDataFormat[] = [
    {name: "Retard en secondes", series: []},
    {name: "Nombre de trains supprimés", series: []}
  ]

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

        // formatage de la moyenne en heures, minutes et secondes
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
        this.nbIncident = 0
        for(let item of this.incidentGraph){
          item.series = []
        }

        for(let obj of data){
          let incidentDate = new Date(obj.date_incident)
          console.log(incidentDate);

          // Si on est en janvier, il faut check pour décembre de l'année d'avant + les jours déjà écoulés en janvier
          if(this.todaysDate.getMonth() == 0){
            if(
              (incidentDate.getFullYear() == this.todaysDate.getFullYear() - 1
              && incidentDate.getMonth() == 11
              && incidentDate.getDate() >= this.todaysDate.getDate())
              ||
              (incidentDate.getFullYear() == this.todaysDate.getFullYear()
              && incidentDate.getMonth() == this.todaysDate.getMonth()
              && incidentDate.getDate() <= this.todaysDate.getDate())
            ){
              // c'est ok, on peut l'ajouter au graph
              this.nbIncident++
              this.incidentGraph[0].series.push(
                {
                  value: obj.retard_secondes,
                  name: incidentDate.toString()
                })
              this.incidentGraph[1].series.push(
                {
                  value: obj.nb_trains_supp,
                  name: incidentDate.toString()
                }
              )
            }
          }
          else{ // si c'est un autre mois, il faut check pour les jours déjà écoulés + ceux restants du mois passé
            if(
              (incidentDate.getFullYear() == this.todaysDate.getFullYear()
              && incidentDate.getMonth() == this.todaysDate.getMonth()
              && incidentDate.getDate() <= this.todaysDate.getDate())
              ||
              (incidentDate.getFullYear() == this.todaysDate.getFullYear()
              && incidentDate.getMonth() == this.todaysDate.getMonth() - 1
              && incidentDate.getDate() >= this.todaysDate.getDate())
            ){
              //c'est ok ça va dans le graph
              this.nbIncident++
              this.incidentGraph[0].series.push(
                {
                  value: obj.retard_secondes,
                  name: incidentDate.toString()
                })
              this.incidentGraph[1].series.push(
                {
                  value: obj.nb_trains_supp,
                  name: incidentDate.toString()
                }
              )
            }
          }
          console.log(this.incidentGraph);

        }

      },
      error: (err) => {
        console.log("Erreur: " + err);
      }
    })
  }
}
