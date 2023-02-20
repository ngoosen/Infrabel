import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { withPreloading } from '@angular/router';
import { EMPTY, Observable} from 'rxjs';
import { map,startWith } from 'rxjs';
import { __values } from 'tslib';
import { LigneArretService } from '../services/ligne-arret.service';
import {InstantService} from'../services/instant.service';
import {PonctualiteJ1Data, PonctualiteJ1Service} from '../services/ponctualite-j1.service';
import {PonctualiteMomentService }from '../services/ponctualite-moment.service'



@Component({
  selector: 'app-ponctualite',
  templateUrl: './ponctualite.component.html',
  styleUrls: ['./ponctualite.component.scss']
})
export class PonctualiteComponent implements OnInit {


  constructor(  private _ligneArretService: LigneArretService ,
                private _InstantService :InstantService ,
                private _PonctulitéMoins1: PonctualiteJ1Service,
                private _Ponctualité:PonctualiteMomentService,


                ){}


  options:string[]=[]
  instant: string[]=[]
  ponctualite:number []=[]
  statstop: any[] = []
  ligne: any[]=[]
  HeureD:any
  HeureA:any
  retardA:number=0
  retardD:number=0

  mycontrol=new FormControl

  filterredOption:Observable<string[]>= EMPTY
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
        this.filterredOption=this.mycontrol.valueChanges.pipe(
          startWith(''),
          map(value=>this._filter(value))
        )
      },
      error: (err) => {
        console.log("Error " + err);
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

      // le pourcentage de poncutalité
    this._Ponctualité.getPonctuality().subscribe({
      next:(ponct)=>{
        let tempPonct= ponct

        for (let pon of tempPonct){
          this.ponctualite.push(pon.ponctualite_pourcentage)
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

      // ponctualite par stop j-1
   this._PonctulitéMoins1.getPonctualityByStop(this.departControl.value).subscribe({
      next: (data) => {

   for(let item of data){
        this.statstop.push(item)
        }
      },
      error: (err) => {
        console.log(err);
      }
    })


}


 // Renvoie tous les liens entre les lignes et les arrêts.
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


  // renvoie les Donnée J-1
  datajmoins1(){
  this._PonctulitéMoins1.getPonctuality().subscribe({
    next:(data)=>{
    let donnéponct=data

    this.HeureA=donnéponct.arr_reel
    this.HeureD=donnéponct.dep_reel
    this.retardA=donnéponct.retard_arr
    this.retardD=donnéponct.retard_dep
      }

  })
}

    //fonction de filtrage des options
    private _filter(value:string){
      const filtervalue=value.toLowerCase()
      return this.options.filter(option=>option.toLocaleLowerCase().includes(filtervalue))



  }

  //

  //fonction déclenchée par le bouton recherche
  showValues() {
    this.showResult = true;
  }


  // fonction pour pas pouvoir cliquer sur bouton avant qui les input soit remplis
  areInputsValid(): boolean {
     return this.departControl.value && this.arriveeControl.value;
      }

}



