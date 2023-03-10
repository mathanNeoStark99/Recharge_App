import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Addon } from '../addon';
import {AddonService} from '../addon.service';

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.css']
})
export class AddonsComponent implements OnInit {
  x:any;
  addon: Addon = new Addon();
  addons: Addon[] | undefined;
  constructor(private addonService: AddonService, private router: Router) { }
  private getAddon() {
    this.addonService.getAddons().subscribe(data => {
     this.addons = data;
     console.log(data);
   });
}
  ngOnInit(): void {
    this.getAddon();
  }
  onSubmit(){
    console.log(this.addon);
  }
  rechargeconfirmation(id:number){
    this.router.navigate(['addon-rechargeconfirmation',id]);
  }

  goToPage(page){
    this.router.navigate([page]);
  }

}