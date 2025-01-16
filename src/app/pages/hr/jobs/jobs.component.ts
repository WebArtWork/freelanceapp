import { Component } from '@angular/core';
import { Freelancejob, FreelancejobService } from 'src/app/modules/freelancejob/services/freelancejob.service';

@Component({
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
	jobs: Freelancejob[] = [];

	load() {
		this._fjs.get({}, { name: 'public' }).subscribe((jobs) => {
			console.log(jobs) 
			this.jobs= jobs;
		});
	}

	constructor(
		public fjs: FreelancejobService,
		private _fjs: FreelancejobService
	) {
		this.load(); 
	}
}
