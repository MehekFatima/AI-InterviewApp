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
    experience: '',
    createdAt: ''
  };

  interviews: {
    jobTitle: string;
    jobDescription: string;
    experience: string;
    createdAt: Date;
    interviewDate: Date;
  }[] = [];

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

//   startInterview() {
//     const storedUserId = localStorage.getItem('userId');
//     const userId = storedUserId ? Number(storedUserId) : 0;

//     // Assign userId to newInterview before sending
//     

//  const newEntry = {
//    ...this.newInterview,
       
//       createdAt: new Date(),
//       interviewDate: new Date()
//     };

//     this.interviewService.generateQuestions(this.newInterview).subscribe({
//       next: (res: any) => {
//         console.log('Questions generated:', res);
//         this.interviews.push(newEntry);

//         this.router.navigate(['/start-interview'], {
//           state: { data: this.newInterview }
//         });

//         // Reset the form
//         this.newInterview = {
//           
//           jobTitle: '',
//           jobDescription: '',
//           experience: '',
//           createdAt: ''
//         };

//         this.showPopup = false;
//       },
//       error: (err) => {
//         console.error('Error generating questions:', err);
//       }
//     });
//   }

startInterview() {
  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId ? Number(storedUserId) : 0;

  

  const newEntry = {
    ...this.newInterview,
    userId: storedUserId, // ✅ Add userId here
    createdAt: new Date(),
    interviewDate: new Date()
  };

  // ✅ Send the newEntry with userId included
  this.interviewService.generateQuestions(newEntry).subscribe({
    next: (res: any) => {
      console.log('Questions generated:', res);
      this.interviews.push(newEntry);

      this.router.navigate(['/start-interview'], {
        state: { data: newEntry }
      });

      // Reset form
      this.newInterview = {
        jobTitle: '',
        jobDescription: '',
        experience: '',
        createdAt: ''
      };

      this.showPopup = false;
    },
    error: (err) => {
      console.error('Error generating questions:', err);
    }
  });
}
}
