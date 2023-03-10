import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Recharge } from '../recharge';
import { RechargeService } from '../recharge.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-displayrecharge',
  templateUrl: './displayrecharge.component.html',
  styleUrls: ['./displayrecharge.component.css']
})
export class DisplayrechargeComponent implements OnInit {

  x:any;
  recharge: Recharge = new Recharge();
  recharges: Recharge[] | undefined;
  constructor(private RechargeService: RechargeService, 
    private router: Router) { }

  addrecharge() {
    this.x = document.getElementById("recharge_inputt");
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

private getrecharge() {
  this.RechargeService.getRecharges().subscribe(data => {
    this.recharges = data;
    console.log(data);
  });
}

saverecharge(){
  this.RechargeService.createRecharge(this.recharge).subscribe(data=>{
    
    this.getrecharge();
    this.recharge = new Recharge();
  },
  error => console.log(error)
  );
}

deleteEmployee(id: number){
  this.RechargeService.deleteRecharge(id).subscribe(data=>{
    console.log(data);
    this.getrecharge();
  })
}

editrecharge(id: number){
  this.router.navigate(['admin/editrecharge', id]);
}

onSubmit(){
  this.saverecharge();
  this.getrecharge();
}

logout(){
  sessionStorage.clear();
  this.router.navigate(['/login']);
}


  ngOnInit(): void {
    
    this.getrecharge();
  }
goToPage(page){
  this.router.navigate([page]);
}
}
