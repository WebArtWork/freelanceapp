import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancecourse, FreelancecourseService } from 'src/app/modules/freelancecourse/services/freelancecourse.service';
import { Freelancejob, FreelancejobService } from 'src/app/modules/freelancejob/services/freelancejob.service';
import { Freelancestartup, FreelancestartupService } from 'src/app/modules/freelancestartup/services/freelancestartup.service';
import { Freelancetest, FreelancetestService } from 'src/app/modules/freelancetest/services/freelancetest.service';

@Component({
	templateUrl: './startup.component.html',
	styleUrls: ['./startup.component.scss'],
})
export class StartupComponent {
	startupId: string = this._router.url.replace('/hr/startup/', '');

	startup: Freelancestartup = {} as Freelancestartup;

	jobs: Freelancejob[] = [];

	courses: Freelancecourse[] = [];

	tests: Freelancetest[] = [];

	load() {
		this._fss.fetch({
			_id: this.startupId
		}, {
			name: 'public'
		}).subscribe(startup => this.startup = startup);

		this._fjs.get({
			query: `?startup=${this.startupId}`
		}, {
			name: 'public'
		}).subscribe(jobs => {
			this.jobs = jobs.filter(job => job.startup === this.startupId);
		});

		this._fcs.get({
			query: `?startup=${this.startupId}`
		}, {
			name: 'public'
		}).subscribe(courses => {
			this.courses = courses.filter(course => course.startup === this.startupId);
		});

		this._fts.get({
			query: `?startup=${this.startupId}`
		}, {
			name: 'public'
		}).subscribe(tests => {
			this.tests = tests.filter(test => test.startup === this.startupId);
		});
	}

	constructor(
		private _fss: FreelancestartupService,
		private _router: Router,
		private _fjs: FreelancejobService,
		private _fcs: FreelancecourseService,
		private _fts: FreelancetestService
	) {
		this.load();
	}
}