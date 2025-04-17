import { Component } from '@angular/core';

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

  interviews = [
    { jobTitle: 'Frontend Developer', createdAt: new Date() },
    { jobTitle: 'Backend Developer', createdAt: new Date() }
  ];

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
    this.interviews.push(newEntry);
    this.newInterview = { jobTitle: '', jobDescription: '', experience: '' };
    this.showPopup = false;
  }
}
