import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../_services/zone.service';

@Component({
  selector: 'app-zone-list',
  templateUrl: 'list.component.html',
})

export class ListComponent implements OnInit {
  
  Zone:any = [];

  constructor(private zoneService: ZoneService) { 
    this.readZone();
  }

  ngOnInit() {}

  readZone(){
    this.zoneService.getAll().subscribe((data) => {
     this.Zone = data;
    })    
  }

  deleteZone(zone, index) {
    if(window.confirm('Are you sure?')) {
        this.zoneService.delete(zone._id).subscribe((data) => {
          this.Zone.splice(index, 1);
        }
      )    
    }
  }

}