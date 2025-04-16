import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  imageURL: string = '../../assets/interview2.1.png';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

toggleConfirmPasswordVisibility() {
  this.showConfirmPassword = !this.showConfirmPassword;
}
 
  onSignup() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    if(this.email === '' || this.password === '' || this.confirmPassword === '') {
      alert('Please fill in all fields');
    }
    else if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
    }    
    else{
      alert('Signup Successful');
    }
    
    // TODO: Signup logic
  }
}
