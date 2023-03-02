import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { withPreloading } from '@angular/router';
import { EMPTY, Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';
import { LigneArretData, LigneArretService } from '../services/ligne-arret.service';
import {InstantService} from'../services/instant.service';
import { PonctualiteJ1Service,PonctualiteJ1Data, AverageJ1Data} from '../services/ponctualite-j1.service';
import {PonctualiteMomentData, PonctualiteMomentService }from '../services/ponctualite-moment.service'
import { DataFormat, GroupedDataFormat, TimeFormat,FormatDataService } from '../services/format-data.service';
import { data, Nbrminuteretard, tauxheureok } from './fakedb';





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
                private _format:FormatDataService


                ){}


  DateAjd:Date=new Date()
  options:string[]=[]
  instant: string[]=[]
  ponctualite:number = 0
  retard:number = 0
  dateponct: Date = new Date()
  ligne:LigneArretData[]=[] ///////////////////////// <= ADRIANO J'AI MODIFIE CA => "ligne:string[]=[]" devient "ligne:LigneArretData[]=[]"
  dateGraph:Date = new Date()
  retardgraph: number=0
  tauxgraph:number=0
  trainmoins6:number=0



  mycontrol=new FormControl()
  filterredOptionDepart:Observable<string[]>= EMPTY
  filterredOptionArrive:Observable<string[]>= EMPTY
  departControl = new FormControl();
  arriveeControl = new FormControl();
  showResult:boolean=false
  showGraph:boolean=true

  todaysDate : Date = new Date("2023-02-01")
//
  fakeDb:any
fakeDbMinRe=Nbrminuteretard
fakeDbpourc=tauxheureok
//

//
Datej_1:Date=new Date()
lastMonthDate: Date = new Date(this.todaysDate.getMonth() == 0 ? this.todaysDate.getFullYear() - 1 : this.todaysDate.getFullYear(), this.todaysDate.getMonth() == 0 ? 11 : this.todaysDate.getMonth() - 1, this.todaysDate.getDate())
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

      //moment de la journée
    this._InstantService.getInstants().subscribe({
      next: (inst)=>{
          let tempInst= inst

          for(let opt of tempInst){
            this.instant.push(opt.fr_instant)
          }
      },
      error: (err) => {
        console.log(err);
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
  showValues(stop:string = this.departControl.value ) {

    this.InfoMoiGraph=data
    this.showResult=true
    this.PonctualiteByStop()
    // this.donneGraph()
    this.dataLigne()
    this.PoncutaliteAnnuelle()
    this.getAverageDelayArrival(stop)
    this.getAverageDelaydépart(stop)

  }


  // fonction pour pas pouvoir cliquer sur bouton avant qui les input soit remplis
  areInputsValid(): boolean {
    return this.departControl.value && this.arriveeControl.value;
     }

PonctualiteByStop(){
  this._Ponctualite.getByStop(this.departControl.value).subscribe({
    next:(data : PonctualiteMomentData[])=>{

      for(let item of data){
        this.dateponct=new Date()
        this.ponctualite=item.ponctualite_pourcentage
        this.retard=item.min_de_retard
      }
    },
    error: (err) => {
      console.log(err);
    }
  })
}

donneGraph(){
  this._Ponctualite.getOnePonctuality(this.departControl.value).subscribe({
    next:(data:PonctualiteMomentData[])=>{
       for(let objet of data){
        this.dateGraph= new Date(objet.date)
        this.retardgraph=objet.min_de_retard
        this.tauxgraph=objet.ponctualite_pourcentage
        this.trainmoins6=objet.nb_train_inferieur_6_min
       }
    }
  });
}

  //   Renvoie tous les liens entre les lignes et les arrêts sous forme de tableau qui contient les lignes et les arrêts associés
  dataLigne(){
    this._ligneArretService.getLineStops().subscribe({
     next:(datas)=>{
       for(let item of datas){
         this.ligne.push(item) //////////////// <= ADRIANO C'EST ICI QUE T'UTILISE LA VARIABLE QUE J'AI MODIFIE
       }
     },
     error: (err) => {
       console.log(err);
     }

   })
  }




monthlyData: DataFormat[] = [];
destinationIc:string=""
tauxponctualiteIc:number=0
trainmoins6Ic:number=0
minuteretardIc:number=0
selectedValue: string = "trainmoins6"
selectedInstant:string="matin"


PoncutaliteAnnuelle(){
  this._Ponctualite.getByStopInstant(this.departControl.value, this.selectedInstant).subscribe({
      next:(data:PonctualiteMomentData[])=>{
        this.monthlyData = []

        for(let objet of data){

          let tempDate = new Date(objet.date)

          let tempPonct = this.monthlyData.find(ponc => ponc.name == objet.date.toString())

          if(tempPonct == undefined){

             if(tempDate.getFullYear() == this.todaysDate.getFullYear()){
              this.showGraph=false

              switch (this.selectedValue) {
                case 'trainmoins6':
                  this.monthlyData.push({
                    name: tempDate.toString(),
                    value: objet.nb_train_inferieur_6_min
                  })
                break;
                case 'retardgraph':
                  this.monthlyData.push({
                    name: tempDate.toString(),
                    value: objet.min_de_retard
                  })
                break
                case 'tauxgraph':
                  this.monthlyData.push({
                    name: tempDate.toString(),
                    value: objet.ponctualite_pourcentage
                  })
                break
                default:

                break;

              }
              this.showGraph=true
            }
           }
          else{
            console.log(tempPonct);
            this.showGraph=false
            let index = this.monthlyData.indexOf(tempPonct)
            switch (this.selectedValue) {
              case 'trainmoins6':
                this.monthlyData[index].value+= objet.nb_train_inferieur_6_min
                break;
              case 'retardgraph':
                this.monthlyData[index].value += objet.min_de_retard
                break
              case 'tauxgraph':
                this.monthlyData[index].value += objet.ponctualite_pourcentage
                break
              default:

                break;
            }
            this.showGraph=true
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
  this._PonctulitéMoins1.getAveragePonctualityByStop(stop).subscribe({
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

getAverageDelaydépart(stop:string=this.arriveeControl.value){
  this._PonctulitéMoins1.getAveragePonctualityByStop(stop).subscribe({
    next: (data: AverageJ1Data[]) => {
      // formatage de la moyenne en heures, minutes et secondes
      this.averageDelayArrivalInTime2 = this._format.formatTime(data[0].moyenne_arrivee)
      this.averageDelayDepartureInTime2 = this._format.formatTime(data[0].moyenne_depart)
    },
    error: (err) => {
      console.log("Erreur: " + err);
    }
  })
}


graphj_1 : GroupedDataFormat[] = [
  {name: "retard arrivé", series: []},
  {name: "retard départ", series: []}
]
getj_1Graph(stop:string=this.departControl.value){
  for(let item of this.graphj_1){
    item.series = []
  }
  this._PonctulitéMoins1.getPonctualityByStop(this.departControl.value).subscribe({
    next:(data:PonctualiteJ1Data[])=>{

    }
  })
  }


}
