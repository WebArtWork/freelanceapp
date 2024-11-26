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
	startupId: string = this._router.url.replace('/startup/', '');
	
	startup: Freelancestartup = {} as Freelancestartup;

	jobs: Freelancejob[] = [];

	get courses(): Freelancecourse[] {
		return this._fcs.coursesByStartup[this.startup._id];
	}

	get tests(): Freelancetest[] {
		return this._fts.testsByStartup[this.startup._id];
	}

	load() {
		this._fss.fetch({
			_id: this.startupId
		}, {
			name: 'public'
		}).subscribe(startup => this.startup = startup);

		this._fjs.get({query: '?startup=' + this.startupId}, { name: 'public' }).subscribe(jobs => this.jobs = jobs);
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
