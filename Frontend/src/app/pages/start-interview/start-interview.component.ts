import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-interview',
  templateUrl: './start-interview.component.html',
  styleUrls: ['./start-interview.component.css']
})
export class StartInterviewComponent implements AfterViewInit, OnInit {
  interviewData: any;
  @ViewChild('webcam', { static: false }) videoElementRef!: ElementRef<HTMLVideoElement>;
  mediaStream: MediaStream | null = null;
  newInterview: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state?.['data']) {
      this.newInterview = nav.extras.state['data'];
      console.log('Interview Data in StartInterviewComponent:', this.newInterview);
    } else {
      console.error('No interview data passed');
    }
  }

  ngOnInit(): void {
    console.log('Interview Data in ngOnInit:', this.newInterview);
  }

  ngAfterViewInit(): void {
    if (this.videoElementRef) {
      console.log('Video Element Reference:', this.videoElementRef.nativeElement);
    }
  }

  enableMedia(): void {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        console.log('Camera and mic access granted');
        this.mediaStream = stream;
        setTimeout(() => {
          if (this.videoElementRef) {
            const videoElement = this.videoElementRef.nativeElement;
            videoElement.srcObject = stream;
            videoElement.play();
          } else {
            console.error('Video element not found');
          }
        }, 0);
      })
      .catch(err => {
        console.error('Access denied:', err);
      });
  }

  stopMedia(): void {
    if (this.mediaStream) {
      const tracks = this.mediaStream.getTracks();
      tracks.forEach(track => track.stop());
      console.log('Media stopped');
    }
  }

  navigateToAnswerPage() {
    this.router.navigate(['/interview/questions']);
  }
}
