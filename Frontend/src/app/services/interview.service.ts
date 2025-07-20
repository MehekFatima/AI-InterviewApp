import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private baseUrl = 'https://ai-interview-app-ruddy.vercel.app/api/v1/';

  constructor(private http: HttpClient) {}

  generateQuestions(interviewData: any) {
    return this.http.post(`${this.baseUrl}generate-questions`, interviewData, { withCredentials: true });
  }

  getUserData(userId: string) {
    return this.http.get(`${this.baseUrl}user/${userId}`, { withCredentials: true });
  }
}


