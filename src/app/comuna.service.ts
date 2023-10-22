import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunaService {

  private apiUrl = 'https://dev.matiivilla.cl/duoc/location/comuna';

  constructor(private http: HttpClient) { }

  obtenerComunas(regionId: number): Observable<any> {
    
    return this.http.get(`${this.apiUrl}/${regionId}`);
  }
  
}
