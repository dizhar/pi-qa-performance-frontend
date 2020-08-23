import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { takeUntil, combineAll } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit,  OnDestroy, AfterViewInit {
  @ViewChild('webpageWithoutPIM') webpage : ElementRef;
  @ViewChild('webpageWithPIM') webpageWithPIM : ElementRef;
  @ViewChild('script_tag') script_tag : ElementRef;
@ViewChild('performanceButton') performanceButton: ElementRef;

  list: any[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading: boolean = false;
  isDisplay: boolean = false;
  isDisabled: boolean = true;
  isWebpageWithPIMDisplayed: boolean = true;

  constructor(private  dataService: DataService, private router: Router) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{
    if(this.list.length === 0) this.performanceButton.nativeElement.disabled = true;
  }

  onAdd(webpageWithoutPIM : string, webpageWithPIM: string, script_tag: string, goal: string, iterations: string, browser: string, spa: boolean){
    

    
    let config = {
       'webpageWithoutPIM': webpageWithoutPIM,
       'webpageWithPIM': webpageWithPIM,
       'script_tag': script_tag,
       'goal': goal,
       'iterations': parseInt(iterations, 10),
       'browser': browser,
       'spa': spa
      }

    
      //Add config type to list.
      this.list.push(config);

      if(this.list.length > 0) this.performanceButton.nativeElement.disabled = false;

      // Clears the webpage input fields.
      this.webpage.nativeElement.value = '';
      
      //disable the add button after event
      this.isDisabled = true;

      //Clear the  script tag input fields.
      this.script_tag.nativeElement.value = '';  

      //Clear the  PIM script tag input field.
      this.webpageWithPIM.nativeElement.value = '';  
      
  }

  submit(){
   this.isLoading=true; // Display the loading spinner button
    this.dataService.sendPostRequest(this.list).subscribe((data: any[])=>{
      this.isLoading=false; // UnDisaply the loading spinner button
      this.dataService.setResuls(data);
      this.router.navigate(['/table']);  // Navigate to the Table page.
    })   
  }


  onItemChange(value){
      switch (value) {
        case 'test production': {
          this.isDisplay = true;   //The script tage input fields is  invisible
          this.isWebpageWithPIMDisplayed = false; // Display the The Input Field, web page With PIM
          this.script_tag.nativeElement.value = '';  //Clears the PIM scriptinput fields.
        }
          break;
        case 'test qa': { this.isDisplay = false;  //The script tage input fields visible
          this.isWebpageWithPIMDisplayed = true; } 
          break;
        }
 }

 onWebPageChange(){
   //If the Script Tag input field is invisible
   if(this.isDisplay === true){
    switch (true){
        case this.webpage.nativeElement.value === '': this.isDisabled = true;    //Disable the Add button, If the webpage input field is vacant, 
        break;
        case this.webpage.nativeElement.value != '': this.isDisabled = false;  // Enable the Add button, if the webpage input field is not empty.
        break;
        default: this.isDisabled = true;  // On default, the Add button is disabled.
        break;
    }
  }


  if(this.isDisplay === false){
    //If the Script Tag input field is visible
    switch (true){
        case this.webpage.nativeElement.value === '' &&  this.script_tag.nativeElement.value === '': this.isDisabled = true;  // Disable the  Add button, if both Webpsge and Script Tag input fields are vacant.
        break;
        case this.webpage.nativeElement.value != '' &&  this.script_tag.nativeElement.value != '': this.isDisabled = false;  // Enable the Add button,  if both Webpsge and Script Tag input fields are not vacant.
        break;
        default: this.isDisabled = true;  // On deafult the Add button is disabled.
        break;
    }
  }
 }


 onscriptTagchange(){
  switch (true){
    case this.webpage.nativeElement.value === '' &&  this.script_tag.nativeElement.value === '': this.isDisabled = true;  // Disable the  Add button, if both Webpsge and Script Tag input fields are vacant.
    break;
    case this.webpage.nativeElement.value != '' &&  this.script_tag.nativeElement.value != '': this.isDisabled = false;  // Enable the Add button,  if both Webpsge and Script Tag input fields are not vacant.
    break;
    default: this.isDisabled = true; // On deafult the Add button is disabled.
    break;
  }
 }



 onRemove(row: number){
  this.list.splice(row, 1);

  if(this.list.length === 0) this.performanceButton.nativeElement.disabled = true;
 }




  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}
