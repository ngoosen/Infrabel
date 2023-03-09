import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import {FormControl} from '@angular/forms'
import { withPreloading, ActivatedRoute } from '@angular/router';
import { EMPTY, Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';
import { LigneArretData, LigneArretService } from '../services/ligne-arret.service';
import {InstantService, InstantData} from'../services/instant.service';
import { PonctualiteJ1Service,PonctualiteJ1Data, AverageJ1Data} from '../services/ponctualite-j1.service';
import {PonctualiteMomentData, PonctualiteMomentService }from '../services/ponctualite-moment.service'
import { DataFormat, GroupedDataFormat, TimeFormat,FormatDataService } from '../services/format-data.service';
import { data, Nbrminuteretard, tauxheureok } from './fakedb';
import { ParamsInUrlService } from '../services/params-in-url.service';




@Component({
  selector: 'app-ponctualite',
  templateUrl: './ponctualite.component.html',
  styleUrls: ['./ponctualite.component.scss']
})
export class PonctualiteComponent implements OnInit {


  constructor(  private _ligneArretService: LigneArretService ,
                private _InstantService :InstantService ,
                private _PonctulitéMoins1: PonctualiteJ1Service,
                private _Ponctualite:PonctualiteMomentService,
                private _format:FormatDataService,
                private _router: ActivatedRoute,
                private _params: ParamsInUrlService


                ){}


  DateAjd:Date=new Date()
  options:string[]=[]
  instant: string[]=[]
  ligne:LigneArretData[]=[] ///////////////////////// <= ADRIANO J'AI MODIFIE CA => "ligne:string[]=[]" devient "ligne:LigneArretData[]=[]"
  graphTheme: string = "nightLights"



  mycontrol=new FormControl()
  filterredOptionDepart:Observable<string[]>= EMPTY
  filterredOptionArrive:Observable<string[]>= EMPTY
  departControl = new FormControl();
  arriveeControl = new FormControl();
  showResult:boolean=false
  showGraph:boolean=false

  selectedStop: string = this.departControl.value

  todaysDate : Date = new Date("2022-02-01")
//
Datej_1:Date=new Date("2023-02-01")
lastMonthDate: Date = new Date(this.Datej_1.getMonth() == 0 ? this.Datej_1.getFullYear() - 1 : this.Datej_1.getFullYear(), this.Datej_1.getMonth() == 0 ? 11 : this.Datej_1.getMonth() - 1, this.Datej_1.getDate())
showLineGraph:boolean=false
//
 InfoMoiGraph : GroupedDataFormat[] = [
    {name: "% de chance de train a l heure", series: []},
    {name: "Nombre de trains moins de 6 min", series: []},
    {name: "nombre de minute de retard", series:[]}
  ]


    //filtre recherche
  ngOnInit(): void {

    this._ligneArretService.getStops().subscribe( {
      next: (data) => {
        let temptab = data

        for(let obj of temptab){
          this.options.push(obj.nom_arret)

        }
        this.filterredOptionDepart=this.departControl.valueChanges.pipe(
          startWith(''),
          map(value=>this._filter(value))
          )

        this.filterredOptionArrive=this.arriveeControl.valueChanges.pipe(
        startWith(''),
        map(value=>this._filter(value))
        )


      },


      error: (err) => {
        console.log(err);
      }
    })

    this._router.queryParamMap.subscribe((params: any) => {
      console.log(params);

      if(params.params.stop != undefined){
        this.showValues(params.params.stop)
      }
    })


  }
    //fonction de filtrage des options
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      console.log(filterValue)
      return this.options.filter(option =>
        option.toLowerCase().startsWith(filterValue)
      );
    }

  //fonction déclenchée par le bouton recherche
  showValues(stop: string = this.departControl.value) {
    this.selectedStop = stop

    this.PoncutaliteAnnuelle();
    this.getAverageDelayArrival(stop);
    this.getAverageGraph(stop);
    this.showResult = true;
    this._params.ponctualityParamsInUrl({stop: stop})
  }



  // fonction pour pas pouvoir cliquer sur bouton avant qui les input soit remplis
  areInputsValid(): boolean {
    return this.departControl.value
     }






monthlyData: DataFormat[] = [];
destinationIc:string=""
tauxponctualiteIc:number=0
trainmoins6Ic:number=0
minuteretardIc:number=0
selectedValue: string = "trainmoins6"
selectedInstant:string="matin"
langue:string='fr'

Instant(){
  this._InstantService.getInstantsByLanguage(this.langue).subscribe({
    next:(data:InstantData[])=>{
    for(let objet of data){
        this.selectedInstant=objet.fr_instant
    }
  }

  })
}

onselect() {

  if (this.selectedValue === 'tauxgraph') {
    this.selectedValue = 'tauxgraph';
    this.PoncutaliteAnnuelle()
    // console.log('selectedValue = ' + this.selectedValue);
  } else if (this.selectedValue === 'retardgraph') {
    this.selectedValue = 'retardgraph';
    this.PoncutaliteAnnuelle()

  } else if (this.selectedValue === 'trainmoins6') {
    this.selectedValue = 'trainmoins6';
    this.PoncutaliteAnnuelle()
  } else {

  }

}

onradio(){
  if (this.selectedInstant === "matin") {
    this.selectedInstant= 'matin';
    this.PoncutaliteAnnuelle()
    // console.log('selectedValue = ' + this.selectedValue);
  } else if (this.selectedInstant === 'soir') {
    this.selectedInstant = 'soir';
    this.PoncutaliteAnnuelle()

  } else if (this.selectedInstant === 'creuse') {
    this.selectedInstant = 'creuse';
    this.PoncutaliteAnnuelle()
  } else if (this.selectedInstant === 'weekends') {
    this.selectedInstant = 'weekends';
    this.PoncutaliteAnnuelle()
}
}

PoncutaliteAnnuelle(){


  this.monthlyData = []
  this.showGraph=false
  this._Ponctualite.getByStopInstant(this.departControl.value, this.selectedInstant).subscribe({
      next:(data:PonctualiteMomentData[])=>{

        for(let objet of data){
          let tempDate  = new Date(objet.date)

          let tempPonct = this.monthlyData.find(ponc => ponc.name == tempDate.toString())
          // console.log(tempPonct);


          // if(objet.destination == (this.departControl.value).toString().toUpperCase()){
            if(tempPonct == undefined){


             if(tempDate.getFullYear() == this.todaysDate.getFullYear()){
              console.log(this.selectedValue);
              switch (this.selectedValue) {
                  case 'trainmoins6':

                  this.monthlyData.push({...this.monthlyData,
                    name: tempDate.toString(),
                    value: objet.nb_train_inferieur_6_min
                  })

                  break;
                case 'retardgraph':

                  this.monthlyData.push({...this.monthlyData,
                    name: tempDate.toString(),
                    value: objet.min_de_retard
                  })

                break
                case 'tauxgraph':

                  this.monthlyData.push({...this.monthlyData,
                    name: tempDate.toString(),
                    value: objet.ponctualite_pourcentage
                  })
                break
                default:

                break;

              }
            }
           }

        }
        this.showGraph = true
      }
  })

}


averageDelayArrivalInSeconds: number = 0
averageDelayArrivalInTime1: TimeFormat = {hours: 0, minutes: 0, seconds: 0}
averageDelayDepartureInSeconds: number = 0
averageDelayDepartureInTime1: TimeFormat = {hours: 0, minutes: 0, seconds: 0}

averageDelayArrivalInTime2: TimeFormat = {hours: 0, minutes: 0, seconds: 0}
averageDelayDepartureInTime2: TimeFormat = {hours: 0, minutes: 0, seconds: 0}

getAverageDelayArrival(stop: string = this.departControl.value){
  this._PonctulitéMoins1.getAveragePonctualityByStop(this.departControl.value).subscribe({
    next: (data: AverageJ1Data[]) => {
      // formatage de la moyenne en heures, minutes et secondes
      this.averageDelayArrivalInTime1 = this._format.formatTime(data[0].moyenne_arrivee)
      this.averageDelayDepartureInTime1 = this._format.formatTime(data[0].moyenne_depart)
    },
    error: (err) => {
      console.log("Erreur: " + err);
    }
  })
}


GraphData: GroupedDataFormat[] = [
  {name: "retard arrivé en seconde", series: []},
  {name: "retard départ en seconde", series: []}
];

getAverageGraph(stop: string = this.departControl.value) {
  this.showLineGraph=false
  let dataMap = new Map<string, {retard_arr: number[], retard_dep: number[]}>();

  this._PonctulitéMoins1.getPonctualityByStop(stop).subscribe({
    next: (data: any) => {
      // Parcourir les données et ajouter les valeurs aux tableaux correspondants dans l'objet Map
      for (let objet of data) {
        let DateaverageGraph = new Date(objet.date);

        if (DateaverageGraph <= this.Datej_1 && DateaverageGraph >= this.lastMonthDate) {
          // Vérifier si la date existe déjà dans l'objet Map
          if (dataMap.has(DateaverageGraph.toString())) {
            // Si la date existe, ajouter les nouvelles valeurs aux tableaux existants
            let existingData = dataMap.get(DateaverageGraph.toString());
            if (existingData) {
              existingData.retard_arr.push(objet.retard_arr);
              existingData.retard_dep.push(objet.retard_dep);
            }
          } else {
            // Si la date n'existe pas, créer un nouveau tableau pour la date et ajouter les valeurs
            let newData = {retard_arr: [objet.retard_arr], retard_dep: [objet.retard_dep]};
            dataMap.set(DateaverageGraph.toString(), newData);
          }
        }
      }

      // Parcourir l'objet Map et calculer la moyenne des valeurs pour chaque jour
      for (let [date, values] of dataMap) {
        let sumRetardArr = values.retard_arr.reduce((a, b) => a + b, 0);
        let sumRetardDep = values.retard_dep.reduce((a, b) => a + b, 0);
        let avgRetardArr = sumRetardArr / values.retard_arr.length;
        let avgRetardDep = sumRetardDep / values.retard_dep.length;

        this.GraphData[0].series.push({
          name: date,
          value: avgRetardArr,
        });

        this.GraphData[1].series.push({
          name: date,
          value: avgRetardDep,
        });
      }
      this.showLineGraph = true
      console.log(this.GraphData);
    },
    error: (error) => {
      console.log(error);
    }
  });
}





}
