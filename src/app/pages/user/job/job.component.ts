import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelanceapplication, FreelanceapplicationService } from 'src/app/modules/freelanceapplication/services/freelanceapplication.service';
import { Freelancecourse } from 'src/app/modules/freelancecourse/services/freelancecourse.service';
import { Freelancejob, FreelancejobService } from 'src/app/modules/freelancejob/services/freelancejob.service';
import { Freelancetest } from 'src/app/modules/freelancetest/services/freelancetest.service';
@Component({
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.scss']
})
export class JobComponent {
	jobId: string = this._router.url.replace('/job/', '');

	job: Freelancejob = {} as Freelancejob;

	get applications(): Freelanceapplication[] {
		return this._fas.applicationsByJob[this.job._id];
	}

	get courses(): Freelancecourse[] {
		return this.job.courses as unknown as Freelancecourse[];
	}

	get tests(): Freelancetest[] {
		return this.job.tests as unknown as Freelancetest[];
	}

	load() {
		this._fjs.fetch({
			_id: this.jobId
		}, {
			name: 'public'
		}).subscribe(job => this.job = job);
	}

	constructor(
		private _fjs: FreelancejobService,
		private _router: Router,
		private _fas: FreelanceapplicationService
	) {
		this.load();
	}
}