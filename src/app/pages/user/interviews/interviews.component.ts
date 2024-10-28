import { Component } from '@angular/core';
import { FreelanceinterviewService } from 'src/app/modules/freelanceinterview/services/freelanceinterview.service';
@Component({
	templateUrl: './interviews.component.html',
	styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent {
	constructor(
		public fis: FreelanceinterviewService
	) { }
}
