import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  height!: number;
  weight!: number;
  bmi: number = 0;
  comment!: string;

  calculateBMI() {
    if (!this.height || !this.weight) {
      this.comment = 'Please enter both weight and height.';
    } else {
      this.bmi = this.weight / (this.height / 100) ** 2;
      this.setComment();
    }
  }

  setComment() {
    if (this.bmi < 18.5) {
      this.comment = 'Underweight 🏋️‍♀️<br>Join us to build strength and muscle!';
    } else if (this.bmi >= 18.5 && this.bmi < 24.9) {
      this.comment = 'Normal weight 💪<br>Keep up the great work! Join us to stay fit!';
    } else if (this.bmi >= 25 && this.bmi < 29.9) {
      this.comment = 'Overweight 🥊<br>Get into the best shape of your life with our training!';
    } else {
      this.comment = 'Obesity 🏃‍♂️<br>Transform your life and health with our programs!';
    }
  }
}
