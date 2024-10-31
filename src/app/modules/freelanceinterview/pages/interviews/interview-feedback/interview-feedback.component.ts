import { Component } from '@angular/core';
import { Freelanceinterview } from '../../../services/freelanceinterview.service';

@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrl: './interview-feedback.component.scss'
})
export class InterviewFeedbackComponent {
interview: Freelanceinterview;

}
