import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PonctualiteMomentService {

  constructor(private _http: HttpClient) { }

  // Renvoie toutes les ponctualités par relation par moment
  getPonctuality(){
    return this._http.get<PonctualiteMomentData[]>("http://localhost:3000/api/v1/ponctualite_des_relations_IC_par_moment")
  }

  // Renvoie une ponctualité par relation et moment correspondant à l'id entrée
  getOnePonctuality(id: number){
    return this._http.get<PonctualiteMomentData[]>("http://localhost:3000/api/v1/ponctualite_des_relations_IC_par_moment/" + id)
  }

  // Renvoie les ponctualités par relation en fonction d'un des stops de la relation
  getByStop(stop: string){
    return this._http.get<PonctualiteMomentData[]>("http://localhost:3000/api/v1/ponctualite_des_relations_IC_par_moment/" + stop)
  }
}
export interface PonctualiteMomentData{
  id_ponctualite_IC_moment: number,
  ponctualite_pourcentage: number,
  nb_train_inferieur_6_min: number,
  min_de_retard: number,
  date: Date,
  destination: string,
  instant: string,
  relation: string
}
