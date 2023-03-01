import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PonctualiteJ1Service {

  constructor(private _http: HttpClient) { }

  // Renvoie toutes les données de ponctualité J-1
  getPonctuality(){
    return this._http.get<PonctualiteJ1Data[]>("http://localhost:3000/api/v1/ponctualite_J-1")
  }

  // Renvoie une donnée de ponctualité J-1 correspondant à l'id entrée
  getOnePonctuality(id: number){
    return this._http.get<PonctualiteJ1Data[]>("http://localhost:3000/api/v1/ponctualite_J-1/" + id)
  }

  getPonctualityByStop(stop: string){
    return this._http.get<PonctualiteJ1Data[]>("http://localhost:3000/api/v1/ponctualite_J-1/" + stop.toUpperCase())
  }

  getAveragePonctualityByStop(stop: string){
    return this._http.get<AverageJ1Data[]>("http://localhost:3000/api/v1/ponctualite_J-1/average/" + stop.toUpperCase())
  }
}
export interface PonctualiteJ1Data{
  id_trajet: number,
  arr_reel: Date,
  arr_prev: Date,
  dep_reel: Date,
  dep_prev: Date,
  retard_arr: number,
  retard_dep: number,
  relation: string,
  ligne_dep: string,
  ligne_arr: string,
  num_train: number,
  arret: string
}
export interface AverageJ1Data{
  moyenne_arrivee: number,
  moyenne_depart: number
}
