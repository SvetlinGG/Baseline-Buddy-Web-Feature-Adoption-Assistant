import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  // analyzeCode(type: string, code: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/analyze`, {type, code});
  // }
  analyzeCode(type: 'html'|'css'|'js', code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyze`, { type, code }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
