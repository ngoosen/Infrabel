import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { withPreloading } from '@angular/router';
import { EMPTY, Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';
import { LigneArretService } from '../services/ligne-arret.service';
import {InstantService} from'../services/instant.service';
import { PonctualiteJ1Service} from '../services/ponctualite-j1.service';
import {PonctualiteMomentData, PonctualiteMomentService }from '../services/ponctualite-moment.service'




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


  options:string[]=[]
  instant: string[]=[]
  ponctualite:number = 0
  retard:number = 0
  dateponct: Date = new Date()

  dateGraph:Date = new Date()
  retardgraph: number=0
  tauxgraph:number=0



  mycontrol=new FormControl()
  filterredOptionDepart:Observable<string[]>= EMPTY
  filterredOptionArrive:Observable<string[]>= EMPTY
  departControl = new FormControl();
  arriveeControl = new FormControl();
  showResult=false


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




Poncutualit(){
  this._Ponctualite.getByStop(this.departControl.value).subscribe({
    next:(data : PonctualiteMomentData[])=>{

      for(let item of data){
        this.dateponct=new Date()
        this.ponctualite=item.ponctualite_pourcentage
        this.retard=item.min_de_retard
      }



    }
  })
}

graph(){


  this._Ponctualite.getOnePonctuality(this.departControl.value).subscribe({
    next:(data:PonctualiteMomentData[])=>{
       for(let objet of data){
        this.dateGraph= new Date()
        this.retardgraph=objet.min_de_retard
        this.tauxgraph=objet.ponctualite_pourcentage
       }

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






  //

  //fonction déclenchée par le bouton recherche
  showValues() {
    this.showResult = true;
    this.Poncutualit()


  }


  // fonction pour pas pouvoir cliquer sur bouton avant qui les input soit remplis
  areInputsValid(): boolean {
     return this.departControl.value && this.arriveeControl.value;
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


//   Renvoie tous les liens entre les lignes et les arrêts.
//  dataLigne(){
//  this._ligneArretService.getLineStops().subscribe({
//   next:(datas)=>{
//     for(let item of datas){
//       this.ligne.push(item)
//     }
//   },
//   error: (err) => {
//     console.log(err);
//   }

// })
// }
