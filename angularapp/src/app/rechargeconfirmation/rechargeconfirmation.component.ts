import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanServService } from '../plan-serv.service';
import { Plan } from '../plan';
import { RechargeService } from '../recharge.service';
import { Recharge } from '../recharge';
import {FormGroup,FormControl,FormControlName,Validators, AbstractControl} from '@angular/forms'


@Component({
  selector: 'app-rechargeconfirmation,[required][ngModel]',
  templateUrl: './rechargeconfirmation.component.html',
  styleUrls: ['./rechargeconfirmation.component.css']
})
export class RechargeconfirmationComponent implements OnInit {
  planId:any;
  num:any;
  rechargeId:number;
  plan: Plan = new Plan();
  recharge : Recharge=new Recharge();
  plans: Plan[] | undefined;
  formBuilder: any;
  constructor(private RechargeService:RechargeService , private planService: PlanServService, private route:ActivatedRoute,private router :Router ) { }
  //constructor(private RechargeService:RechargeService,private route:ActivatedRoute,private router :Router){}
  private getPlan() {
       this.planService.getPlans().subscribe(data => {
        this.plans = data;
        console.log(data);
      });
  }
  private rechargemodel()
  {
    this.planService.getPlanById(this.planId).subscribe(data=>{
      this.plan=data;
      this.recharge.rechargeId=data.planId;
      this.recharge.rechargePlan=data.planName;
      this.recharge.rechargePrice=data.planPrice;
      this.recharge.rechargetype=data.planType;
      
    },error => console.log(error));
  }

  saveRecharge(){
    console.log("save rechargeworking");
    this.rechargemodel();
   
    this.RechargeService.createRecharge(this.recharge).subscribe(data=>{
      console.log(data);
      
    },
    error => console.log(error)
    );
  }
  rechargeform=new FormGroup({
	  email:new FormControl('',[Validators.required,Validators.email]),
	  name:new FormControl(''),
    mobile:new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}")])
  })

  get email(){
	  return this.rechargeform.get('email');
  }
  get name(){
	  return this.rechargeform.get('name');
  }
  get mobile(){
	  
    return  this.rechargeform.get('mobile');
   
  }
 
  ngOnInit(): void {
    this.getPlan();
    this.planId=this.route.snapshot.params['planId'];
    this.plan=new Plan();
    this.planService.getPlanById(this.planId).subscribe(data=>{
      this.plan=data;
      this.recharge.rechargeId=data.planId;
      this.recharge.rechargePlan=data.planName;
      this.recharge.rechargePrice=data.planPrice;
      this.recharge.rechargetype=data.planType;
     // var em=document.getElementById("email");
      //this.recharge.email=document.getElementById("email");
    },error => console.log(error));
  
  }

  onRecharge(){
    
    this.saveRecharge();
    this.num=this.recharge.mobile;
    this.router.navigate(['notifications',this.num]);
    
  }
  /*deteleRecharge(rechargeId:number){
    this.deteleRecharge(rechargeId).subscribe(data=>{
      console.log(data);
      this.rechargeService.deleteRecharge();
    });
  }*/

  goToPage(page){
    this.router.navigate([page]);
  }
}