import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { ActivatedRoute, withPreloading } from '@angular/router';
import { EMPTY, Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';
import { DataFormat, FormatDataService, GroupedDataFormat, TimeFormat } from '../services/format-data.service';
import { IncidentData, IncidentService } from '../services/incident.service';
import { LigneArretService } from '../services/ligne-arret.service';
import { IncidentParams, ParamsInUrlService } from '../services/params-in-url.service';
import { PonctualiteJ1Service } from '../services/ponctualite-j1.service';
import { barChartDelayByIncident, data, pieChartIncidentTypes } from './fakedb';

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
    private _format : FormatDataService,
    private _params : ParamsInUrlService,
    private _router: ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string
    )
    {
      registerLocaleData(localeFr)
    }

  mycontrol = new FormControl
  departControl = new FormControl();

  selectedStop: string = this.departControl.value

  options : string[]=[]
  filterredOption : Observable<string[]> = EMPTY

  showResult = false
  showError = false

  averageDelayArrivalInSeconds: number = 0
  averageDelayArrivalInTime: TimeFormat = {hours: 0, minutes: 0, seconds: 0}
  averageDelayDepartureInSeconds: number = 0
  averageDelayDepartureInTime: TimeFormat = {hours: 0, minutes: 0, seconds: 0}

  todaysDate : Date = new Date("2023-02-01")
  lastMonthDate: Date = new Date(this.todaysDate.getMonth() == 0 ? this.todaysDate.getFullYear() - 1 : this.todaysDate.getFullYear(), this.todaysDate.getMonth() == 0 ? 11 : this.todaysDate.getMonth() - 1, this.todaysDate.getDate())

  nbIncident: number = 0
  nbRetardTotal: number = 0
  retardTotalTime: TimeFormat = {hours: 0, minutes: 0, seconds: 0}
  nbTrainsSuppTotal : number = 0

  monthlyDelayLineGraph : GroupedDataFormat[] = [
    {name: "Retard en secondes", series: []},
    {name: "Nombre de trains supprimés", series: []}
  ]

  plusGrosRetard: number = 0
  plusGrosTrainsSupp: number = 0
  plusGrosIncident: string = ""
  plusGrosRetardTime: TimeFormat = {hours: 0, minutes: 0, seconds: 0}

  latestIncident: string = ""
  latestDelay: number = 0
  latestTrainsSupp: number = 0
  latestDelayTime: TimeFormat = {hours: 0, minutes: 0, seconds: 0}

  incidentPieGraph: DataFormat[] = []
  overallIncidentsBarGraph: DataFormat[] = []
  selectedIncidentType: string = ""

  relationArrivalAverage: number = 0
  relationDepartureAverage: number = 0

  picker: any = EMPTY

  graphTheme: string = "nightLights"

  ngOnInit(): void {
    //filtre recherche
    this._ligneArretService.getStops().subscribe( {
      next: (data) => {
        let temptab = data

        for(let obj of temptab){
          this.options.push(obj.nom_arret)
        }
        this.filterredOption = this.departControl.valueChanges.pipe(
          startWith(''),
          map(value=>this._filter(value))
        )
      },
      error: (err) => {
        console.log("Erreur: " + err);
      }
    })

    // Read params

    this._router.queryParamMap.subscribe((params: any) => {
      console.log(params);

      if(params.params.date != undefined){
        this.todaysDate = new Date(params.params.date)
      }
      if(params.params.stop != undefined){
        this.getData(params.params.stop)
      }
    })
  }

  private _filter(value:string){
    const filtervalue=value.toLowerCase()
    return this.options.filter(option=>option.toLocaleLowerCase().includes(filtervalue))
  }

  // Button onClick
  getData(stop: string = this.departControl.value){
    console.log(stop);

    this.selectedStop = stop
    this.lastMonthDate = new Date(this.todaysDate.getMonth() == 0 ? this.todaysDate.getFullYear() - 1 : this.todaysDate.getFullYear(), this.todaysDate.getMonth() == 0 ? 11 : this.todaysDate.getMonth() - 1, this.todaysDate.getDate())

    if(stop == undefined){
      this.showError = true
      setTimeout(() => {
        this.showError = false
      }, 3000)
    }
    this.getAverageDelay(stop)
    this.getIncidentStats(stop)
    this.getLatestIncident(stop)
    this.onSelect({name: "Heurt d'une personne", value: 1}) // => changer ça mais je sais pas par quoi
    this._params.incidentParamsInUrl({stop: stop, selectedDate: this.todaysDate.toISOString()})
    this.incidentPieGraph = pieChartIncidentTypes // => fake db
    this.overallIncidentsBarGraph = barChartDelayByIncident // => fake db
    this.monthlyDelayLineGraph = data // => fake db
    this.showResult = true
  }

  // Moyenne de retard / arrêt
  getAverageDelay(stop: string = this.departControl.value){
    this._ponctualiteService.getPonctualityByStop(stop).subscribe({
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
  getIncidentStats(stop: string = this.departControl.value){
    this.nbIncident = 0
    for(let item of this.monthlyDelayLineGraph){
      item.series = []
    }
    this.nbRetardTotal = 0
    this.nbTrainsSuppTotal = 0
    this.plusGrosRetard = 0

    this._incidentService.getIncidentByPlace(stop).subscribe({
      next: (data : IncidentData[]) => {

        for(let obj of data){
          let incidentDate = new Date(obj.date_incident)

          if(incidentDate < this.todaysDate || incidentDate > this.lastMonthDate){
            this.nbIncident++
              this.monthlyDelayLineGraph[0].series.push(
                {
                  value: obj.retard_minutes,
                  name: incidentDate.toString()
                })
              this.nbRetardTotal += obj.retard_minutes

              this.monthlyDelayLineGraph[1].series.push(
                {
                  value: obj.nb_trains_supp,
                  name: incidentDate.toString()
                })
              this.nbTrainsSuppTotal += obj.nb_trains_supp

              if(obj.retard_minutes > this.plusGrosRetard){
                this.plusGrosRetard = obj.retard_minutes
                this.plusGrosTrainsSupp = obj.nb_trains_supp
                this.plusGrosIncident = obj.type_incident
              }
          }

          this.retardTotalTime = this._format.formatTime(this.nbRetardTotal)
          this.plusGrosRetardTime = this._format.formatTime(this.plusGrosRetard)
        }

        // Faire en sorte de remplir le pie chart qui reprend les différents types d'incidents par nb dudit type d'incident
        for(let item of data){
          let incidentIsInGraph = this.incidentPieGraph.find(inc => inc.name == item.type_incident)

          if(incidentIsInGraph == undefined){
            this.incidentPieGraph.push(
              {
                name: item.type_incident,
                value: 1
              }
            )
          }
          else{
            incidentIsInGraph.value++
          }
        }

      },
      error: (err) => {
        console.log("Erreur: " + err);
      }
    })
  }

  // Incident le plus récent
  getLatestIncident(stop: string = this.departControl.value){
    this._incidentService.getIncidentByPlace(stop).subscribe({
      next: (data: IncidentData[]) => {
        let latestData = data.pop()

        this.latestDelay = latestData!.retard_minutes
        this.latestTrainsSupp = latestData!.nb_trains_supp
        this.latestIncident = latestData!.type_incident
        this.latestDelayTime = this._format.formatTime(this.latestDelay)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // Moyenne de retard / relation
  // getRelationAverage(stop: string = this.departControl.value){
  //   this.relationArrivalAverage = 0
  //   this.relationDepartureAverage = 0
  //   let relationStats: any[] = []
  //   let stopStats: any[] = []
  //   let commonRelation = ""

  //   this._ponctualiteService.getPonctualityByStop(stop).subscribe({
  //     next: (data) => {
  //       commonRelation = data[0].relation.split(":", 1).toString()

  //       for(let item of data){
  //         stopStats.push(item)
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })

  //   this._ponctualiteService.getPonctuality().subscribe({
  //     next: (data) => {
  //       for(let item of data){
  //         if(item.relation.split(":", 1) == commonRelation){
  //           relationStats.push(item)
  //         }
  //       }
  //       let iterations = 0
  //       for(let item of relationStats){
  //         this.relationArrivalAverage += item.retard_arr
  //         this.relationDepartureAverage += item.retard_dep
  //         iterations ++
  //       }
  //       this.relationArrivalAverage = this.relationArrivalAverage / iterations
  //       this.relationDepartureAverage = this.relationDepartureAverage / iterations
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }

  onSelect(incident: DataFormat){
    this._incidentService.getIncidents().subscribe({
      next: (data: IncidentData[]) => {
        this.selectedIncidentType = incident.name
        for(let item of data){
          let itemDate = new Date(item.date_incident)

          if(incident.name == item.type_incident && itemDate > this.lastMonthDate && itemDate < this.todaysDate){
            this.overallIncidentsBarGraph.push({
              name: item.date_incident.toString(),
              value: item.retard_minutes
            })
          }
        }
      },
      error: (err) => {
        console.log("Erreur: " + err);
      }
    })
  }
}
