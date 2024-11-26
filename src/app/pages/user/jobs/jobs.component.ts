import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

	gotoStartup(startupId: string): void {
		if (startupId) {
		  this._router.navigate(['/startup', startupId]); // Формування URL для переходу на сторінку стартапу
		} else {
		  console.error('Startup ID is missing for this job.');
		}
	  }

	constructor(
		public fjs: FreelancejobService,
		private _fjs: FreelancejobService,
		private _router: Router
	) {
		this.load(); 
	}
}
