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
  showError = false

  averageDelayArrivalInSeconds: number = 0
  averageDelayArrivalInTime: TimeFormat = {hours: 0, minutes: 0, seconds: 0}
  averageDelayDepartureInSeconds: number = 0
  averageDelayDepartureInTime: TimeFormat = {hours: 0, minutes: 0, seconds: 0}

  todaysDate : Date = new Date("2023-02-01")
  nbIncident: number = 0
  nbRetardTotal: number = 0
  nbTrainsSuppTotal : number = 0

  incidentGraph : GroupedDataFormat[] = [
    {name: "Retard en secondes", series: []},
    {name: "Nombre de trains supprimés", series: []}
  ]

  plusGrosRetard: number = 0
  plusGrosTrainsSupp: number = 0
  plusGrosIncident: string = ""

  latestIncident: string = ""
  latestDelay: number = 0
  latestTrainsSupp: number = 0

  relationArrivalAverage: number = 0
  relationDepartureAverage: number = 0

  picker: any = EMPTY

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
    if(this.departControl.value == undefined){
      this.showError = true
      setTimeout(() => {
        this.showError = false
      }, 3000)
    }
    this.getAverageDelay()
    this.getIncidentStats()
    this.getLatestIncident()
    this.getRelationAverage()
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
  getIncidentStats(){
    this.nbIncident = 0
    for(let item of this.incidentGraph){
      item.series = []
    }
    this.nbRetardTotal = 0
    this.nbTrainsSuppTotal = 0
    this.plusGrosRetard = 0

    this._incidentService.getIncidentByPlace(this.departControl.value).subscribe({
      next: (data) => {

        for(let obj of data){
          let incidentDate = new Date(obj.date_incident)

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
              this.nbRetardTotal += obj.retard_secondes

              this.incidentGraph[1].series.push(
                {
                  value: obj.nb_trains_supp,
                  name: incidentDate.toString()
                })
              this.nbTrainsSuppTotal += obj.nb_trains_supp

              if(obj.retard_secondes > this.plusGrosRetard){
                this.plusGrosRetard = obj.retard_secondes
                this.plusGrosTrainsSupp = obj.nb_trains_supp
                this.plusGrosIncident = obj.type_incident
              }
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
              this.nbRetardTotal += obj.retard_secondes

              this.incidentGraph[1].series.push(
                {
                  value: obj.nb_trains_supp,
                  name: incidentDate.toString()
                })
              this.nbTrainsSuppTotal += obj.nb_trains_supp

              if(obj.retard_secondes > this.plusGrosRetard){
                this.plusGrosRetard = obj.retard_secondes
                this.plusGrosTrainsSupp = obj.nb_trains_supp
                this.plusGrosIncident = obj.type_incident
              }
            }
          }
        }
      },
      error: (err) => {
        console.log("Erreur: " + err);
      }
    })
  }

  // Incident le plus récent
  getLatestIncident(){
    this._incidentService.getIncidentByPlace(this.departControl.value).subscribe({
      next: (data) => {
        let latestData = data.pop()

        this.latestDelay = latestData.retard_secondes
        this.latestTrainsSupp = latestData.nb_trains_supp
        this.latestIncident = latestData.type_incident
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getRelationAverage(){
    this.relationArrivalAverage = 0
    this.relationDepartureAverage = 0
    let relationStats: any[] = []
    let stopStats: any[] = []
    let commonRelation = ""

    this._ponctualiteService.getPonctualityByStop(this.departControl.value).subscribe({
      next: (data) => {
        commonRelation = data[0].relation.split(":", 1).toString()

        for(let item of data){
          stopStats.push(item)
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

    this._ponctualiteService.getPonctuality().subscribe({
      next: (data) => {
        for(let item of data){
          if(item.relation.split(":", 1) == commonRelation){
            relationStats.push(item)
          }
        }
        let iterations = 0
        for(let item of relationStats){
          this.relationArrivalAverage += item.retard_arr
          this.relationDepartureAverage += item.retard_dep
          iterations ++
        }
        this.relationArrivalAverage = this.relationArrivalAverage / iterations
        this.relationDepartureAverage = this.relationDepartureAverage / iterations
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
