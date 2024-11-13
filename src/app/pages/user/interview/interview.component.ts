import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelanceinterview, FreelanceinterviewService } from 'src/app/modules/freelanceinterview/services/freelanceinterview.service';
@Component({
	templateUrl: './interview.component.html',
	styleUrls: ['./interview.component.scss']
})
export class InterviewComponent {
	interview: Freelanceinterview = this._fis.doc(this._router.url.replace('/interview/', ''));

	constructor(
		private _fis: FreelanceinterviewService,
		private _router: Router
	) { }
}
