import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { withPreloading } from '@angular/router';
import { EMPTY, Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';
import { LigneArretService } from '../services/ligne-arret.service';
import {InstantService} from'../services/instant.service';
import { PonctualiteJ1Service,PonctualiteJ1Data} from '../services/ponctualite-j1.service';
import {PonctualiteMomentData, PonctualiteMomentService }from '../services/ponctualite-moment.service'
import { DataFormat, GroupedDataFormat } from '../services/format-data.service';
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


                ){}


  DateAjd:Date=new Date()
  options:string[]=[]
  instant: string[]=[]
  ponctualite:number = 0
  retard:number = 0
  dateponct: Date = new Date()
  ligne:string[]=[]
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
  lastMonthDate: Date = new Date(this.todaysDate.getMonth() == 0 ? this.todaysDate.getFullYear() - 1 : this.todaysDate.getFullYear(), this.todaysDate.getMonth() == 0 ? 11 : this.todaysDate.getMonth() - 1, this.todaysDate.getDate())
//
  fakeDb:any
fakeDbMinRe=Nbrminuteretard
fakeDbpourc=tauxheureok
//

//
Datej_1:Date=new Date()

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
  showValues() {
    this.lastMonthDate = new Date(this.todaysDate.getMonth() == 0 ? this.todaysDate.getFullYear() - 1 : this.todaysDate.getFullYear(), this.todaysDate.getMonth() == 0 ? 11 : this.todaysDate.getMonth() - 1, this.todaysDate.getDate())
    this.InfoMoiGraph=data
    this.showResult = true;
    this.PonctualiteByStop()
    // this.donneGraph()
    this.dataLigne()
    this.onValueChanged()
    this.PoncutaliteAnnuelle()

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

      //   Renvoie tous les liens entre les lignes et les arrêts.
  dataLigne(){
    this._ligneArretService.getLineStops().subscribe({
     next:(datas)=>{
       for(let item of datas){
         this.ligne.push(item)
       }
     },
     error: (err) => {
       console.log(err);
     }

   })
  }

  graphRetard(){
    this._Ponctualite.getOnePonctuality(this.departControl.value).subscribe({
      next:(data:PonctualiteMomentData[])=>{
         for(let objet of data){
          this.dateGraph= new Date(objet.date)
          this.retardgraph=objet.min_de_retard

      }
      },
      error: (err) => {
        console.log(err);
      }

    })
  }



  graphtaux(){
    this._Ponctualite.getOnePonctuality(this.departControl.value).subscribe({
      next:(data:PonctualiteMomentData[])=>{
         for(let objet of data){
          this.dateGraph= new Date(objet.date)
          this.tauxgraph=objet.ponctualite_pourcentage
      }
      }
    })
}

graphminderetard(){
  this._Ponctualite.getOnePonctuality(this.departControl.value).subscribe({
    next:(data:PonctualiteMomentData[])=>{
       for(let objet of data){
        this.dateGraph= new Date(objet.date)
        this.trainmoins6=objet.nb_train_inferieur_6_min
    }
    }
  })
}


monthlyData: DataFormat[] = [];
destinationIc:string=""
tauxponctualiteIc:number=0
trainmoins6Ic:number=0
minuteretardIc:number=0


PoncutaliteAnnuelle(){
  this._Ponctualite.getByStop(this.arriveeControl.value).subscribe({
      next:(data:PonctualiteMomentData[])=>{

        for(let objet of data){

          let tempDate = new Date(objet.date)

          let tempPonct = this.monthlyData.find(ponc => ponc.name == objet.date.toString())

          if(tempPonct == undefined){
            if(tempDate.getFullYear() == this.todaysDate.getFullYear()){
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
                  this.showGraph=false

                break;
              }
            }
          }
          else{
            switch (this.selectedValue) {
              case 'trainmoins6':
                tempPonct.value+= objet.nb_train_inferieur_6_min
                break;
              case 'retardgraph':
                tempPonct.value += objet.min_de_retard
              break
              case 'tauxgraph':
                tempPonct.value += objet.ponctualite_pourcentage
              break
              default:
                      this.showGraph=false

                break;
            }
          }



        // this.trainmoins6Ic=objet.nb_train_inferieur_6_min
        // this.tauxponctualiteIc=objet.ponctualite_pourcentage
        // this.minuteretardIc=objet.min_de_retard
      }
      }
  })

}



selectedValue: any

onValueChanged() {
  this.showGraph=true
  switch (this.selectedValue) {
    case 'tauxgraph':
      // définir les données pour le graphique "chance d'arriver a l'heure"
      name:'chance d etre a l heure'
      this.fakeDb=this.fakeDbpourc

      break;
    case 'retardgraph':
      // définir les données pour le graphique "Nombre de minute de retard"
      name:"Minute de retard"
      this.fakeDb = this.fakeDbMinRe

      break;
    case 'trainmoins6':
      // définir les données pour le graphique "Train moins de 6 minute de retard"
      name:"train moins de 6 minutes de retard"
      this.fakeDb = this.trainmoins6

      break;
    default:
      this.showGraph=false
}
}




}
     // le pourcentage de poncutalité
    // this._Ponctualité.getPonctuality().subscribe({
    //   next:(ponct)=>{
    //     let tempPonct= ponct

    //     for (let pon of tempPonct){
    //       this.ponctualite.push(pon.ponctualite_pourcentage)
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })


  // renvoie les Donnée J-1
//   datajmoins1(){
//   this._PonctulitéMoins1.getPonctuality().subscribe({
//     next:(data:PonctualiteJ1Data)=>{
//     let donnéponct=data

//     this.HeureA=donnéponct.arr_reel
//     this.HeureD=donnéponct.dep_reel
//     this.retardA=donnéponct.retard_arr
//     this.retardD=donnéponct.retard_dep
//       }

//   })
// }

 // ponctualite par stop j-1
//    this._PonctulitéMoins1.getPonctualityByStop(this.departControl.value).subscribe({
//       next: (data) => {

//    for(let item of data){
//         this.statstop.push(item)
//         }
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     })


// }


// PoncutaliteAnnuelle() {
//   const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

//   for(let month of months) {
//     this._Ponctualite.getByStopAndMonth(this.arriveeControl.value, month).subscribe({
//       next:(data:PonctualiteMomentData[])=>{

//         for(let objet of data){

//           this.trainmoins6Ic = objet.nb_train_inferieur_6_min
//           this.tauxponctualiteIc = objet.ponctualite_pourcentage
//           this.minuteretardIc = objet.min_de_retard
//         }
//       }
//     });
//   }
// }

// PonctualiteAnnuelle() {
//   for (let mois = 1; mois <= 12; mois++) {
//     this._Ponctualite.getByStopAndMonth(this.arriveeControl.value, mois).subscribe({
//       next: (data: PonctualiteMomentData[]) => {
//        for(let objet of data){

//           this.trainmoins6Ic = objet.nb_train_inferieur_6_min
//           this.tauxponctualiteIc = objet.ponctualite_pourcentage
//           this.minuteretardIc = objet.min_de_retard
//       }
//     });
//   }
// }
