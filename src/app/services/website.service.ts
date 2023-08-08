import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  constructor(private http: HttpClient) {
  }

  checkWebsitesRust(file: string, event: any): Observable<any> {
    const headers = new HttpHeaders();
    // ... set headers if necessary ...
    return this.http.post('http://localhost:8000/checkStatus', file, {
      headers: headers,
      responseType: 'text'
    });
  }


}
