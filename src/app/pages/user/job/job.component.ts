import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelanceapplication, FreelanceapplicationService } from 'src/app/modules/freelanceapplication/services/freelanceapplication.service';
import { Freelancecourse, FreelancecourseService } from 'src/app/modules/freelancecourse/services/freelancecourse.service';
import { Freelancejob, FreelancejobService } from 'src/app/modules/freelancejob/services/freelancejob.service';
import { Freelancetest, FreelancetestService } from 'src/app/modules/freelancetest/services/freelancetest.service';
@Component({
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.scss']
})

export class JobComponent {
	jobId: string = this._router.url.replace('/job/', '');

	job: Freelancejob = {} as Freelancejob;

	applications: Freelanceapplication[] = [];

	courses: Freelancecourse[] = [];

	tests: Freelancetest[] = [];

	load() {
		this._fjs.fetch({
			_id: this.jobId
		}, {
			name: 'public'
		}).subscribe(job => this.job = job);

		this._fas.get({ query: '?job=' + this.jobId }, { name: 'public' }).subscribe(applications => {
			this.applications = applications;
		});

		this._fcs.get({ query: '?job=' + this.jobId }, { name: 'public' }).subscribe(courses => this.courses = courses);

		this._fts.get({ query: '?job=' + this.jobId }, { name: 'public' }).subscribe(tests => this.tests = tests);
	}

	constructor(
		private _fjs: FreelancejobService,
		private _router: Router,
		private _fas: FreelanceapplicationService,
		private _fcs: FreelancecourseService,
		private _fts: FreelancetestService
	) {
		this.load();
	}
}