import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from '../plan';
import { PlanServService } from '../plan-serv.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-prepaidplans',
  templateUrl: './prepaidplans.component.html',
  styleUrls: ['./prepaidplans.component.css']
})
export class PrepaidplansComponent implements OnInit {

  x:any;
  plan: Plan = new Plan();
  plans: Plan[] | undefined;
  constructor(private planService: PlanServService, 
    private router: Router) { }

    addplan() {
      this.x = document.getElementById("plan_inputt");
      this.x.style.display = "none";
      if (this.x.style.display === "none") {
          this.x.style.display = "block";
      } else {
          this.x.style.display = "none";
      }
  }

  closeBlock(){
    if (this.x.style.display === "block") {
      this.x.style.display = "none";
  } else {
      this.x.style.display = "block";
  }
  }

private getPlan() {
  this.planService.getPlans().subscribe(data => {
    this.plans = data;
    console.log(data);
  });
}

savePlan(){
  this.planService.createPlan(this.plan).subscribe(data=>{
    this.getPlan();
    this.plan = new Plan();
  },
  error => console.log(error)
  );
}

deleteEmployee(planId: number){
  this.planService.deletePlan(planId).subscribe(data=>{
    console.log(data);
    this.getPlan();
  })
}

updatePlans(planId: number){
  this.router.navigate(['admin/update-plan', planId]);
}

onSubmit(){
  this.savePlan();
}

logout(){
  sessionStorage.clear();
  this.router.navigate(['/login']);
}


  ngOnInit(): void {
    this.getPlan();
  }

  goToPage(page){
    this.router.navigate([page]);
  }

}
