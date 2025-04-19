import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private baseUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  generateQuestions(interviewData: any) {
    return this.http.post(`${this.baseUrl}/generate-questions`, interviewData, { withCredentials: true });
  }
}
