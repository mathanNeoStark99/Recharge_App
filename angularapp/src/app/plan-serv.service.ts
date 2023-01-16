import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from './plan';

@Injectable({
  providedIn: 'root'
})
export class PlanServService {

  private baseURL = "http://35.170.243.30:8080/admin/addPlan";
  private baseUrl1 = "http://35.170.243.30:8080/admin/viewPlan";
  private baseUrl2 = "http://35.170.243.30:8080/admin/deletePlan";
  private baseUrl3 = "http://35.170.243.30:8080/admin/updatePlan";
  constructor(private httpClient: HttpClient) { }

  createPlan(plan: Plan): Observable<Object>{
    return this.httpClient.post(this.baseURL, plan);
  }

  getPlans(): Observable<Plan[]>{
    return this.httpClient.get<Plan[]>(this.baseUrl1);
  }

  getPlanById(id: number): Observable<Plan>{
    return this.httpClient.get<Plan>(`${this.baseUrl1}/${id}`);
  }

  updatePlan(id: number, plan: Plan): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl3}/${id}`, plan);
  }

  deletePlan(planId:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl2}/${planId}`);
  }

}