import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Addon } from './addon';

@Injectable({
  providedIn: 'root'
})
export class AddonService {


  private baseURL = "http://35.170.243.30:8080/admin/addAddon";
  private baseUrl1 = "http://35.170.243.30:8080/admin/viewAddon";
  private baseUrl2 = "http://35.170.243.30:8080/admin/deleteAddon";
  private baseUrl3 = "http://35.170.243.30:8080/admin/updateAddon";

  constructor(private httpClient: HttpClient) { }

  createAddon(addon: Addon): Observable<Object>{
    return this.httpClient.post(this.baseURL, addon);
  }


  getAddons(): Observable<Addon[]>{

    return this.httpClient.get<Addon[]>(this.baseUrl1);
  }

  getAddonById(id: number): Observable<Addon>{
    return this.httpClient.get<Addon>(`${this.baseUrl1}/${id}`);
  }

  updateAddon(id: number, addon: Addon): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl3}/${id}`, addon);
  }

  deleteAddon(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl2}/${id}`);
  }

}