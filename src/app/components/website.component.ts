import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../services/website.service';
import { API_URL, NB_RELOAD_IMAGE, URL_LOGS, URL_EXCELS, URL_SCREENSHOTS } from '../constants'
//import * as url from "url";
import {ApiResponseRust} from "../services/website";
import {finalize} from "rxjs";


@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})

export class WebsiteComponent implements OnInit {
  websites: any[] = []; // A table for storing websites
  nbTotalSites: number = 0;
  nbUpSites: number = 0;
  nbDownSites: number = 0;
  nbTimeoutSites: number = 0;
  date : any = "";

  isLoading = false;


  logs : any = ""; // Init logs
  isVerificationComplete: boolean = false;
  fileToUpload: File | null = null;// Init file to Upload
  upFilter: boolean = true; // Property to filter "UP" sites
  downFilter: boolean = true; // Property to filter "DOWN" sites
  timeoutFilter: boolean = true; // Property to filter "DOWN" sites
  maxNumberErrorAttempts = 0 ;



  constructor(private websiteService: WebsiteService) {}

  ngOnInit(): void {
  }


  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if( target.files ) {
      this.fileToUpload = target.files[0];
      console.log("On file selected"+ this.fileToUpload);
    } else {
      console.log("Error: onFileSelected null");
    }
  }

  async onSubmit(event: any) {
    const fileReader = new FileReader();
    if (this.fileToUpload) {
      fileReader.readAsText(this.fileToUpload, "UTF-8");
      fileReader.onload = async () => {
        console.log("fileReader.result = " + fileReader.result);
        if(fileReader.result){

          this.isLoading = true; // Start showing the progress bar
          this.websiteService.checkWebsitesRust(fileReader.result as string, event).pipe(
            finalize(() => this.isLoading = false)).subscribe(
            response => {
              // Split the response by line breaks to get individual JSON strings
              const lines = (response as string).trim().split('\n');

              // Parse each line to get JSON objects
              let parsedObjects = lines.map(line => JSON.parse(line));
              console.log(parsedObjects);
              const websiteObjects = parsedObjects.filter(obj => !('date' in obj));
              const dateObjects = parsedObjects.filter(obj => 'date' in obj);


              console.log("dateObjects: "+ dateObjects);
              console.log("dateObjects: "+ dateObjects[0].date);
              console.log("dateObjects: "+ dateObjects[0].up_count);
              console.log("dateObjects: "+ dateObjects[0].down_count);
              console.log("dateObjects: "+ dateObjects[0].timeout_count);

              this.date = dateObjects[0].date;
              this.nbUpSites = dateObjects[0].up_count;
              this.nbDownSites = dateObjects[0].down_count;
              this.nbTimeoutSites = dateObjects[0].timeout_count;
              this.nbTotalSites = (dateObjects[0].up_count + dateObjects[0].down_count + dateObjects[0].timeout_count);

              console.log(websiteObjects[3].screenshot)
              this.websites = websiteObjects;

              this.isVerificationComplete = true; // Updating the isVerificationComplete variable
            },
            error => {
              console.error('There was an error:', error);
            }
          );
        } else {
          console.log("Error: the format of the txt file is not correct.")
        }
      }
      fileReader.onerror = (error) => {
        console.log(error);
      }
    }
  }


  downloadLogs() {
    console.log("logs name: "+this.logs);
    const logsFileName = this.logs;
    const fileUrl = URL_LOGS+logsFileName;
    window.open(fileUrl, '_blank');
  }

  downloadExcel() {
    console.log("Excel file name: "+this.logs);
    const excelFileName = this.logs;
    const fileUrl = URL_EXCELS+excelFileName;
    window.open(fileUrl, '_blank');
  }

  onClickPrint() {
    window.print();
  }

  getButtonClass(): string {
    return this.isVerificationComplete ? 'enabled' : 'disabled';
  }

  handleImageError(website: any) {
    if(this.maxNumberErrorAttempts<=NB_RELOAD_IMAGE){
      website.screen += '?' + new Date().getTime(); // Add a single request parameter to force image refresh
      console.log("ADD HANDLE IMAGE ERROR: "+this.maxNumberErrorAttempts);
      this.maxNumberErrorAttempts++;
    } else {
      console.log("Cannot load this image "+ website.screen +", to many attempts.");
      this.maxNumberErrorAttempts=0;
    }
  }

  toggleFilter(filter: string, event: Event) {
    console.log("toggleFilter");
    const checked = (event.target as HTMLInputElement).checked;
    if (filter === 'up') {
      console.log("up");
      this.upFilter = checked;
    } else if (filter === 'down') {
      console.log("down");
      this.downFilter = checked;
    } else if (filter === 'timeout') {
      console.log("timeout");
      this.timeoutFilter = checked;
    }
  }

}
