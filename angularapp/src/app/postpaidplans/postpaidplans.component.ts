import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from '../plan';
import { PlanServService } from '../plan-serv.service';

@Component({
  selector: 'app-postpaidplans',
  templateUrl: './postpaidplans.component.html',
  styleUrls: ['./postpaidplans.component.css']
})
export class PostpaidplansComponent implements OnInit {

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

updatePlans(planId: number){
  this.router.navigate(['admin/update-plan', planId]);
}

deleteEmployee(planId: number){
  this.planService.deletePlan(planId).subscribe(data=>{
    console.log(data);
    this.getPlan();
  })
}

onSubmit(){
  this.savePlan();
}

logout(){
  sessionStorage.clear();
  this.router.navigate(['']);
}



  ngOnInit(): void {
    this.getPlan();
  }

  goToPage(page){
    this.router.navigate([page]);
  }

}
