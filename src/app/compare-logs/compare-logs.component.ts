import { Component } from '@angular/core';
import { LogService } from '../services/log.service';
import { API_URL } from 'src/app/constants'

@Component({
  selector: 'app-compare-logs',
  templateUrl: './compare-logs.component.html',
  styleUrls: ['./compare-logs.component.css']
})
export class CompareLogsComponent {
  fileToUploadPrecheck: File | null = null;
  fileToUploadPostcheck: File | null = null;
  differences: { url: string, status1: string, status2: string }[] = [];
  displayedColumns: string[] = ['url', 'status1', 'status2'];
  // @ts-ignore
  apiUrl:API_URL; // IMPORTANT: Use by the "compare-logs.component.html"


  constructor(private logService: LogService) { }

  onFileSelectedPrecheck(event: Event){
    const target = event.target as HTMLInputElement;
    if( target.files ) {
      this.fileToUploadPrecheck = target.files[0];
    } else {
      console.log("Error: onFileSelected null")
    }
  }

  onFileSelectedPostcheck(event: Event){
    const target = event.target as HTMLInputElement;
    if( target.files ) {
      this.fileToUploadPostcheck = target.files[0];
    } else {
      console.log("Error: onFileSelected null")
    }
  }

  async onSubmit(){
    let precheck;
    let postcheck;

    if(this.fileToUploadPrecheck && this.fileToUploadPostcheck){

      try{
        precheck = await this.readResult(this.fileToUploadPrecheck);
        postcheck = await this.readResult(this.fileToUploadPostcheck);
      }catch (e){
        console.log(e);
      }

      if(precheck && postcheck){
        let differences = this.logService.compareLogs(precheck , postcheck);
        console.log(typeof differences);
        this.logService.exportDifferencesToExcel({differences: differences});
        this.differences = differences;

      } else {
        console.log("Error: precheck and/or postcheck is null");
      }


    }
  }

  async readResult(fileToUpload: File | null = null): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let fileReader = new FileReader();
      if (fileToUpload) {
        fileReader.readAsText(fileToUpload, "UTF-8");
        fileReader.onload = () => {
          console.log(fileReader.result);
          resolve(fileReader.result as string);
        }
        fileReader.onerror = () => {
          reject("Error reading file");
        }
      } else {
        reject("No file selected");
      }
    });
  }

}
