import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelanceinterview, FreelanceinterviewService } from 'src/app/modules/freelanceinterview/services/freelanceinterview.service';
@Component({
	templateUrl: './interview.component.html',
	styleUrls: ['./interview.component.scss']
})
export class InterviewComponent {
	course: Freelanceinterview = this._fis.doc(this._router.url.replace('/interview/', ''));
	interview: any;

	constructor(
		private _fis: FreelanceinterviewService,
		private _router: Router
	) { }
}
