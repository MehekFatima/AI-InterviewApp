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
  transcript = '';
  questionTimer: any;
  questionTimeLeft = 120000;
  interviewId: string = '';
  @ViewChild('video') videoElementRef!: ElementRef<HTMLVideoElement>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInterviewQuestions();
    this.initSpeechRecognition();
    this.enableMedia();
  }

  get currentQuestion(): { questionText: string } | undefined {
    return this.questions[this.currentQuestionIndex];
  }

  fetchInterviewQuestions() {
    const userId = localStorage.getItem('userId') || '';
    console.log('Fetching questions for userId:', userId);

    this.http.get<any>(`http://localhost:4000/api/v1/interviews/${userId}`, { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.questions = res.questions || [];
          this.interviewId = res._id;
          this.startTimer();
        },
        error: (err) => {
          console.error('Failed to load questions:', err);
        }
      });
  }

  enableMedia() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.mediaStream = stream;
        if (this.videoElementRef?.nativeElement) {
          this.videoElementRef.nativeElement.srcObject = stream;
        }
      })
      .catch(error => {
        console.error('Error accessing media devices:', error);
      });
  }

  initSpeechRecognition() {
    if (annyang) {
      annyang.addCallback('result', (phrases: string[]) => {
        const spoken = phrases[0];
        this.transcript += (this.transcript ? ' ' : '') + spoken;
      });

      annyang.addCallback('error', (error: any) => {
        console.error('Speech recognition error:', error);
      });
    }
  }

  startRecording() {
    if (annyang) {
      this.isRecording = true;
      this.transcript = '';
      annyang.start();
    }
  }

  stopRecording() {
    if (annyang && this.isRecording) {
      this.isRecording = false;
      annyang.abort();
      this.saveRecording();
    }
  }

  startTimer() {
    this.questionTimeLeft = 120000;
    clearInterval(this.questionTimer);
    this.questionTimer = setInterval(() => {
      this.questionTimeLeft -= 1000;
      if (this.questionTimeLeft <= 0) {
        clearInterval(this.questionTimer);
        this.saveRecording();
      }
    }, 1000);
  }

  finishTest() {
    const confirmed = confirm("Are you sure you want to finish the test?");
    if (confirmed) {
      if (this.isRecording && annyang) {
        annyang.abort();
      }
      clearInterval(this.questionTimer);
      this.redirectToFeedbackPage();
    }
  }

  saveRecording() {
    const trimmedTranscript = this.transcript.trim();

    // Skip empty answer and move on
    if (!trimmedTranscript) {
      this.moveToNextOrEnd();
      return;
    }

    const answerData = {
      interviewId: this.interviewId,
      text: trimmedTranscript,
      questionIndex: this.currentQuestionIndex
    };

    console.log('Interview ID:', this.interviewId);
    console.log('Transcript:', trimmedTranscript);
    console.log('Question Index:', this.currentQuestionIndex);

    this.http.post('http://localhost:4000/api/v1/interviews/save-answer', answerData, { withCredentials: true })
      .subscribe({
        next: () => {
          this.transcript = '';
          this.moveToNextOrEnd();
        },
        error: (err) => {
          console.error('Error saving answer:', err);
        }
      });
  }

  nextQuestion() {
    clearInterval(this.questionTimer);

    // Stop ongoing recording
    if (this.isRecording && annyang) {
      annyang.abort();
      this.isRecording = false;
    }

    this.saveRecording();
  }

  moveToNextOrEnd() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.transcript = '';
      this.startTimer();
    } else {
      this.redirectToFeedbackPage();
    }
  }

  readQuestion() {
    const question = this.currentQuestion?.questionText;
    const utterance = new SpeechSynthesisUtterance(question);
    speechSynthesis.speak(utterance);
  }

  get timerMinutes(): number {
    return Math.floor(this.questionTimeLeft / 60000);
  }

  get timerSeconds(): number {
    return Math.floor((this.questionTimeLeft % 60000) / 1000);
  }

  getTimerDisplay() {
    return `${this.timerMinutes}:${this.timerSeconds < 10 ? '0' + this.timerSeconds : this.timerSeconds}`;
  }

  redirectToFeedbackPage() {
    window.location.href = `/feedback/${this.interviewId}`;
  }
}
