import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LigneArretService {

  constructor(private _http : HttpClient) { }

  // Renvoie toutes les lignes
  getLines(){
    return this._http.get<any>("http://localhost:3000/api/v1/lignes")
  }

  // Renvoie tous les arrêts
  getStops(){
    return this._http.get<any>("http://localhost:3000/api/v1/arrets")
  }

  // Renvoie l'arrêt correspondant à l'id entré.
  getOneStop(id: number){
    return this._http.get<any>("http://localhost:3000/api/v1/arrets/" + id)
  }

  // Renvoie tous les liens entre les lignes et les arrêts.
  getLineStops(){
    return this._http.get<any>("http://localhost:3000/api/v1/ligne_arret")
  }

  // Renvoie les liens entre lignes et arrêts pour la ligne correspondant à l'id entrée.
  getByLineID(id: string){
    // !!!!! Attention, si la ligne contient un "/", le remplacer par un "-" !!!!! => "0/1" devient "0-1"
    if(id.indexOf("/") >= 0){
      id = id.replace("/", "-")
    }
    return this._http.get<any>("http://localhost:3000/api/v1/ligne_arret/ligne/" + id)
  }

  // Renvoie les liens entre lignes et arrêts pour l'arrêt correspondant à l'id entrée.
  getByStopID(id: number){
    return this._http.get<any>("http://localhost:3000/api/v1/ligne_arret/arret/" + id)
  }
}
export interface LigneArretData{
  arret: string,
  ligne: string
}
export interface LigneData{
  id_ligne: number
}
export interface ArretData{
  id_arret: number,
  nom_arret: string
}
