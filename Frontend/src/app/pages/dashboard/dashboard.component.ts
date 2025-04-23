import { Component } from '@angular/core';
import { InterviewService } from 'src/app/services/interview.service';
import { Router } from '@angular/router';

interface Interview {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  experience: string;
  createdAt: Date;
  interviewDate: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showPopup: boolean = false;
  isLoading: boolean = false;

  newInterview = {
    jobTitle: '',
    jobDescription: '',
    experience: '',
    createdAt: ''
  };

  interviews: Interview[] = [];

  userName: string = '';

  constructor(private interviewService: InterviewService, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.interviewService.getUserData(userId).subscribe({
        next: (res: any) => {
          console.log('User Data:', res);
          this.userName = res.name;
          this.interviews = res.interviews;
          console.log(this.interviews[0]?.interviewDate);
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        }
      });
    } else {
      console.warn('No user ID found in localStorage');
    }
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  startInterview() {
    const storedUserId = localStorage.getItem('userId');
    const userId = storedUserId ? Number(storedUserId) : 0;
    this.isLoading = true;

    const newEntry = {
      ...this.newInterview,
      userId: storedUserId,
      createdAt: new Date(),
      interviewDate: new Date()
    };

    this.interviewService.generateQuestions(newEntry).subscribe({
      next: (res: any) => {
        console.log('Questions generated:', res);
        this.interviews.push(res.interview); // assuming res.interview has the correct shape

        this.router.navigate(['/start-interview'], {
          state: { data: res.interview }
        });
        console.log('Interview Data:', res.interview);
        

        this.newInterview = {
          jobTitle: '',
          jobDescription: '',
          experience: '',
          createdAt: ''
        };

        this.showPopup = false;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error generating questions:', err);
        this.isLoading = false;
      }
    });
  }

  goToFeedback(interviewId: string) {
    this.router.navigate([`/feedback/${interviewId}`], { state: { interviewId } });
  }
}
