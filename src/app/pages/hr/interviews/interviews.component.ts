import { Component } from '@angular/core';
import { Freelanceinterview, FreelanceinterviewService } from 'src/app/modules/freelanceinterview/services/freelanceinterview.service';
@Component({
	templateUrl: './interviews.component.html',
	styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent {
	interviews: Freelanceinterview[] = [];

	load() {
		this._fis.get({}, { name: 'public' }).subscribe((interviews) => {
			console.log(interviews)
			this.interviews = interviews;
		});
	}

	constructor(
		public fis: FreelanceinterviewService,
		private _fis: FreelanceinterviewService
	) {
		this.load();

	}
}
