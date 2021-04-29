import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
 outPuts: Object;
 list: [];
 listofConfigFiles = new Array();

  constructor(private  dataService: DataService,  private activatedroute: ActivatedRoute, ) { }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.outPuts = this.dataService.getResults();
    this.list = this.outPuts['data'];

    console.log("daniel:", this.list)
    console.log("(this.outPuts['data']:", this.outPuts['data']);

    // this.deleteConfigFiles(this.outPuts['data'])
  }

  // private deleteConfigFiles(list: []) {
  //   list.forEach(item => {
  //     if (!this.listofConfigFiles.includes(item['agent']['session']['configFile'])) {
  //       this.listofConfigFiles.push(item['agent']['session']['configFile']);
  //     }
  //   });

  //   this.dataService.deleteTempConfigFile(this.listofConfigFiles).subscribe(
  //     result => console.log(result),
  //     err => console.error(err),
  //     );
  // }
}
