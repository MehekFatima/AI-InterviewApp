import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  imageURL:string="../../assets/interview1.jpg";

  showPassword: boolean = false;
  togglePassword() {
  this.showPassword = !this.showPassword;
}
  onLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    if(this.email==="" ||this.password===""){
      alert("Please enter email and password");
      return;
    }
    else{
      alert("Login Successfull");
    }
    // TODO: Add authentication logic
  }
}
