import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class IncidentTypesService {

  constructor(private _http: HttpClient) { }

  // Renvoie tous les types d'incident
  getTypes(){
    return this._http.get<any>("http://localhost:3000/api/v1/incident_types")
  }

  // Renvoie le type d'incident correspondant à l'id entrée.
  getOneType(id: number){
    return this._http.get<any>("http://localhost:3000/api/v1/incident_types/" + id)
  }

  // Renvoie tous les types dans la langue entrée.
  getTypesByLanguage(language: string){
    return this._http.get<any>("http://localhost:3000/api/v1/incident_types/" + language)
  }

  // Renvoie le typde d'incident correspondant à l'id entrée, dans la langue entrée.
  getTypeByIDLanguage(id: number, language: string){
    return this._http.get<any>("http://localhost:3000/api/v1/incident_types/" + id + "/" + language)
  }
}
