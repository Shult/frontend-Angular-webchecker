import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiResponse, ApiResponseRust} from './website';
import { API_URL } from 'src/app/constants'

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  constructor(private http: HttpClient) {
  }

  //checkWebsites(urls: string[], event: any): Observable<ApiResponse> {
  // checkWebsites(urls: string[], event: any) {
  //   console.log("checkWebsites");
  //   let validURL: any[] = [];  // Initialize array
  //
  //   let urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
  //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name and extension
  //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  //     '(\\:\\d+)?' + // port
  //     '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
  //     '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
  //     '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  //
  //   urls.forEach(url => {
  //     //console.log(url);
  //     url = url.trim();  // Removes blank spaces and carriage return characters
  //     if (urlPattern.test(url)) {
  //       //console.log(url + " is a correct URL");
  //       validURL.push(url);  // Add URL to array if valid
  //     } else {
  //       console.log(url + " is not a correct URL");
  //     }
  //   });
  //
  //   let jsonObject = {"urls": validURL};
  //   console.log("jsonObject = " + jsonObject);
  //
  //   if (event.target.id == "bt_check_python") {
  //     console.log("Check python");
  //     return this.http.post<ApiResponse>(API_URL + '/api/startPython', jsonObject);
  //   } else if (event.target.id == "bt_check_rust") {
  //     console.log("Check rust");
  //     return this.http.post<ApiResponseRust>("http://localhost:8000/checkStatus", jsonObject);
  //   } else {
  //     console.log("Check classic");
  //     return this.http.post<ApiResponse>(API_URL + '/api/checkStatus', jsonObject);
  //   }
  //
  // }


  // checkWebsitesRust(urls: string, event: any) {
  //   console.log("checkWebsitesRust: " + event);
  //
  //   console.log("checkWebsitesRust: urls: " + urls);
  //
  //   return this.http.post<string>("http://localhost:8000/checkStatus", urls);
  // }


  checkWebsitesRust(file: string, event: any): Observable<any> {
    const headers = new HttpHeaders();
    // ... set headers if necessary ...
    return this.http.post('http://localhost:8000/checkStatus', file, {
      headers: headers,
      responseType: 'text'
    });
  }


}
