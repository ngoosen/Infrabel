import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor(private _http: HttpClient) { }

  // Renvoie tous les incidents
  getIncidents(){
    return this._http.get<IncidentData[]>("http://localhost:3000/api/v1/incidents")
  }

  // Renvoie l'incident correspondant à l'id
  getOneIncident(id: number){
    return this._http.get<IncidentData[]>("http://localhost:3000/api/v1/incidents/" + id)
  }

  // Renvoie les incidents par lieu
  getIncidentByPlace(place: string){
    return this._http.get<IncidentData[]>("http://localhost:3000/api/v1/incidents/" + place.toUpperCase())
  }
}
export interface IncidentData{
  id_incident: number,
  retard_minutes: number,
  nb_trains_supp: number,
  lieu: string,
  type_incident: string,
  date_incident: Date,
  ligne: string
}
