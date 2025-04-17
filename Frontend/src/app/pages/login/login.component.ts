import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  imageURL: string = "../../assets/interview1.jpg";
  showPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    if (this.email === "" || this.password === "") {
      alert("Please enter email and password");
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:5000/api/v1/login', loginData, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('authToken', res.token); 
          alert("Login Successful!");
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          alert(err.error.message || 'Login failed');
          console.error(err);
        }
      });
  }
}
