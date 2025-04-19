import { Component } from '@angular/core';
import { InterviewService } from 'src/app/services/interview.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showPopup: boolean = false;

  newInterview = {
    jobTitle: '',
    jobDescription: '',
    experience: ''
  };

  interviews: { jobTitle: string; jobDescription: string; experience: string; createdAt: Date }[] = [];

  constructor(private interviewService: InterviewService, private router: Router) {} 

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  startInterview() {
    const newEntry = {
      ...this.newInterview,
      createdAt: new Date()
    };

    this.interviewService.generateQuestions(this.newInterview).subscribe({
      next: (res: any) => {
        console.log('Questions generated:', res);
        this.interviews.push(newEntry);
        this.router.navigate(['/start-interview'], {
          state: { data: this.newInterview }
        });

        this.newInterview = { jobTitle: '', jobDescription: '', experience: '' };
        this.showPopup = false;
      },
      error: (err) => {
        console.error('Error generating questions:', err);
      }
    });
  }
}
