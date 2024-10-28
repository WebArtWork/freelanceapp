import { Component } from '@angular/core';
import { Freelancetest } from '../../../services/freelancetest.service';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrl: './test-questions.component.scss'
})
export class TestQuestionsComponent {
	test: Freelancetest;
}
