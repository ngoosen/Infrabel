import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDataService {

  constructor() { }

  // Formatage de secondes en heures, minutes et secondes
  formatTime(seconds: number): TimeFormat{
    let leftOutSeconds = seconds % 60

    let minutes = seconds - leftOutSeconds
    minutes = minutes / 60
    let leftOutMinutes = minutes % 60

    minutes = minutes - leftOutMinutes
    let hours = minutes / 60

    return {
      hours: hours,
      minutes: leftOutMinutes,
      seconds: leftOutSeconds
    }
  }
}
export interface DataFormat{
  name: string,
  value: number
}
export interface GroupedDataFormat{
  name: string,
  series: DataFormat[]
}
export interface TimeFormat{
  hours: number,
  minutes: number,
  seconds: number
}
