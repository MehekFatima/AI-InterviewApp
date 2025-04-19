import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import annyang from 'annyang';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent implements OnInit {
  questions: { questionText: string, answerText?: string }[] = [];
  currentQuestionIndex = 0;
  mediaStream: MediaStream | null = null;
  isRecording = false;
  recordedText = '';

  @ViewChild('video') videoElementRef!: ElementRef<HTMLVideoElement>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInterviewQuestions(); // Load questions on component initialization
    this.initSpeechRecognition(); // Initialize speech-to-text (annyang)
  }

  
  fetchInterviewQuestions() {

    const userId = localStorage.getItem('userId') || '';
    console.log('interviewId:', userId);
    
    this.http.get<any>(`http://localhost:4000/api/v1/interviews/${userId}`, { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.questions = res.questions || [];
        },
        error: (err) => {
          console.error('Failed to load questions:', err);
        }
      });
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  
  enableMedia() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.mediaStream = stream;
        if (this.videoElementRef && this.videoElementRef.nativeElement) {
          this.videoElementRef.nativeElement.srcObject = stream;
        }
      })
      .catch(error => {
        console.error('Error accessing camera/mic:', error);
      });
  }

  
  initSpeechRecognition() {
    if (annyang) {
      annyang.start();

      annyang.addCallback('result', (phrases: string[]) => {
        const transcript = phrases[0]; // Get the first recognized phrase
        this.recordedText = transcript;
      });

      annyang.addCallback('error', (error: any) => {
        console.error('Error with speech recognition:', error);
      });
    }
  }

  
  startRecording() {
    if (annyang) {
      this.isRecording = true;
      annyang.start(); 
    } else {
      console.error('Annyang or SpeechRecognition is not available.');
    }
  }

  
  stopRecording() {
    if (annyang && this.isRecording) {
      this.isRecording = false;
      annyang.abort(); 
      this.saveRecording(); 
    }
  }

  
  saveRecording() {
    const answerData = {
      text: this.recordedText,
      questionIndex: this.currentQuestionIndex
    };

    this.http.post('http://localhost:4000/api/v1/answers', answerData)
      .subscribe({
        next: (res) => {
          console.log('Answer saved successfully:', res);
          if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++; 
          } else {
            alert("Interview finished!"); 
          }
        },
        error: (err) => {
          console.error('Error saving answer:', err);
        }
      });
  }
}