import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelanceinterview, FreelanceinterviewService } from 'src/app/modules/freelanceinterview/services/freelanceinterview.service';
@Component({
	templateUrl: './interview.component.html',
	styleUrls: ['./interview.component.scss']
})
export class InterviewComponent {
	interviewId: string = this._router.url.replace('/interview/', '');

	interview: Freelanceinterview = {} as Freelanceinterview;

	load() {
		this._fis.fetch({
			_id: this.interviewId
		}, {
			name: 'public'
		}).subscribe(interview => this.interview = interview);
	}

	constructor(
		private _fis: FreelanceinterviewService,
		private _router: Router
	) {
		this.load();
	}
}
