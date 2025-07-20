import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  imageURL: string = '../../assets/interview2.1.png';
  showPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignup() {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

this.http.post('https://ai-interviewapp.onrender.com/api/v1/register', user, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          alert('Signup successful');
          console.log(res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(err.error.message || 'Signup failed');
          console.error(err);
        }
      });
  }
}
