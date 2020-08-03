import { Component, OnInit } from '@angular/core';
import { PermitService } from '../_services/permit.service';

@Component({
  selector: 'app-permit-list',
  templateUrl: 'list.component.html',
})

export class PermitListComponent implements OnInit {
  
  Permit:any = [];

  constructor(private permitService: PermitService) { 
    this.readPermit();
  }

  ngOnInit() {}

  readPermit(){
    this.permitService.getAll().subscribe((data) => {
     this.Permit = data;
    })    
  }

  deletePermit(permit, index) {
    if(window.confirm('Are you sure?')) {
        this.permitService.delete(permit._id).subscribe((data) => {
          this.Permit.splice(index, 1);
        }
      )    
    }
  }

}