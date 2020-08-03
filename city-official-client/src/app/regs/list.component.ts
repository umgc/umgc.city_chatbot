import { Component, OnInit } from '@angular/core';
import { RegulationService } from '../_services/regulation.service';

@Component({
  selector: 'app-regulation-list',
  templateUrl: 'list.component.html',
})

export class RegListComponent implements OnInit {
  
  Regulation:any = [];

  constructor(private regulationService: RegulationService) { 
    this.readRegulation();
  }

  ngOnInit() {}

  readRegulation(){
    this.regulationService.getAll().subscribe((data) => {
     this.Regulation = data;
    })    
  }

  deleteRegulation(regulation, index) {
    if(window.confirm('Are you sure?')) {
        this.regulationService.delete(regulation._id).subscribe((data) => {
          this.Regulation.splice(index, 1);
        }
      )    
    }
  }

}