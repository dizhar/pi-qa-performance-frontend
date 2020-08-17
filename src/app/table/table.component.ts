import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
 outPuts: Object;


  constructor(private  dataService: DataService,  private activatedroute: ActivatedRoute, ) { }

  ngOnInit(): void {
     this.outPuts = this.dataService.getPageExray();
     console.log(this.outPuts['data'].agent.link);
  }

}
