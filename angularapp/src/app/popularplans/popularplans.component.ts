import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanServService } from '../plan-serv.service';
import { Plan } from '../plan';

@Component({
  selector: 'app-popularplans',
  templateUrl: './popularplans.component.html',
  styleUrls: ['./popularplans.component.css']
})
export class PopularplansComponent implements OnInit {
  x:any;
  plan: Plan = new Plan();
  plans: Plan[] | undefined;
  constructor(private planService: PlanServService, private router: Router) { }
  private getPlan() {
       this.planService.getPlans().subscribe(data => {
        this.plans = data;
        console.log(data);
      });
  }
  ngOnInit(): void {
    this.getPlan();
  }
  onSubmit(){
    console.log(this.plan);
  }
  rechargeconfirmation(planId:number){
    this.router.navigate(['rechargeconfirmation',planId]);
  }

  goToPage(page){
    this.router.navigate([page])
  }

}
