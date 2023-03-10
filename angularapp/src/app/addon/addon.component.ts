import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Addon } from '../addon';
import { AddonService } from '../addon.service';
@Component({
  selector: 'app-addon',
  templateUrl: './addon.component.html',
  styleUrls: ['./addon.component.css']
})
export class AddonComponent implements OnInit {

  x:any;
  Addon: Addon = new Addon();
  Addons: Addon[] | undefined;
  constructor(private AddonService: AddonService, 
    private router: Router) { }

  addAddon() {
    this.x = document.getElementById("Addon_inputt");
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

private getAddon() {

  this.AddonService.getAddons().subscribe(data => {
    this.Addons = data;

    console.log(data);
  });
}

saveAddon(){
  this.AddonService.createAddon(this.Addon).subscribe(data=>{
    this.getAddon();
    this.Addon= new Addon();
  },
  error => console.log(error)
  );
}

updateAddons(id: number){
  this.router.navigate(['admin/update-addon', id]);
}

deleteEmployee(id: number){
  this.AddonService.deleteAddon(id).subscribe(data=>{
    console.log(data);
    this.getAddon();
  })
}

onSubmit(){
  this.saveAddon();
}

logout(){
  sessionStorage.clear();
  this.router.navigate(['']);
}
  ngOnInit(): void {

    this.getAddon();
  }

  goToPage(page){
    this.router.navigate([page]);
  }

}