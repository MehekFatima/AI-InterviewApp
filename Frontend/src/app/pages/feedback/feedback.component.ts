import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  interviewId: string = '';
  questions: any[] = [];
  overallFeedback: string = '';
  loading = true;
  feedback: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.interviewId = this.route.snapshot.paramMap.get('interviewId') || '';
    console.log('Interview ID:', this.interviewId);
    
    this.fetchFeedback();
  }

  fetchFeedback() {
    if (!this.interviewId) {
      console.error("Interview ID is missing!");
      return;
    }
  
    this.http.post<any>(
      'http://localhost:4000/api/v1/generate-feedback',
      { interviewId: this.interviewId },
      { withCredentials: true }
    ).subscribe({
      next: (res) => {
        this.questions = res.questions;
        this.overallFeedback = res.overallFeedback;
        this.loading = false;
      },
      error: (err) => {
        if(err.error?.message==='Feedback has already been generated for this interview'){
          this.fetchExistingFeedback();
        }else {
        console.error('Error fetching feedback:', err);
        this.loading = false;
      }
    }
    });
  }

  fetchExistingFeedback(){
    this.http.get(`http://localhost:4000/api/v1/interviews/${this.interviewId}`, { withCredentials: true }).subscribe({
      next: (res: any) => {
        this.feedback = res.interview.overallFeedback;
      },
      error: (err) => {
        console.error('Error fetching existing feedback:', err);
      }
    });
    
  }
}