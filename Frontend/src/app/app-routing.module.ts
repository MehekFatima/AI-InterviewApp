import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { StartInterviewComponent } from './pages/start-interview/start-interview.component';
import { QuestionAnswerComponent } from './pages/question-answer/question-answer.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path:'dashboard', component:DashboardComponent},
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'start-interview', component: StartInterviewComponent },
  {path:'interview/questions', component:QuestionAnswerComponent},
  {path:'feedback/:interviewId', component:FeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
