import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class InstantService {

  constructor(private _http: HttpClient) { }

  // Renvoie tous les moments de la journée
  getInstants(){
    return this._http.get<any>("http://localhost:3000/api/v1/instants")
  }

  // Renvoie le moment de la journée correspondant à l'id
  getOneInstant(id: number){
    return this._http.get<InstantData[]>("http://localhost:3000/api/v1/instants/" + id)
  }

  // Renvoie tous les moments de la journée, triés par langue
  // language = "nl", "fr" ou "en"
  getInstantsByLanguage(language: string){
    return this._http.get<InstantData[]>("http://localhost:3000/api/v1/instants/" + language)
  }

  // Renvoie le moment de la journée correspondant à l'id entrée, dans la langue entrée
  // language = "nl", "fr" ou "en"
  getInstantByIDLanguage(id: number, language: string){
    return this._http.get<InstantData[]>("http://localhost:3000/api/v1/instants/" + id + "/" + language)
  }
}
export interface InstantData{
  id_instant: number,
  nl_instant: string,
  fr_instant: string,
  en_instant: string
}
