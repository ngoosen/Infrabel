import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ParamsInUrlService {

  constructor(private _router: Router) { }

  ponctualityParamsInUrl(params: PonctualityParams){
    this._router.navigate(["/"], {queryParams: {departure: params.departure, arrival: params.arrival}})
  }

  incidentParamsInUrl(params: IncidentParams){
    this._router.navigate(["/probleme/"], {queryParams: {stop: params.stop, date: params.selectedDate}})
  }
}
export interface PonctualityParams{
  departure: string,
  arrival: string
}
export interface IncidentParams{
  stop: string,
  selectedDate: string
}
