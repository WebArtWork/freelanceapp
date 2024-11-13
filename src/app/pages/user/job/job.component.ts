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
	job: Freelancejob = this._fjs.doc(this._router.url.replace('/job/', ''));

	get applications(): Freelanceapplication[] {
		return this._fas.applicationsByJob[this.job._id];
	}

	/*get courses(): Freelancecourse[] {
		return this._fcs.coursesByJob[this.job._id];
	}

	get tests(): Freelancetest[] {
		return this._fts.testsByJob[this.job._id];
	}*/

	/*get certificates(): Freelancecertificate[] {
		let certificates: Freelancecertificate[] = [];

		for (const course of this.job.courses) {
			certificates = certificates.concat(this._fcs.certificatesByCourse[course]);
		}

		for (const test of this.job.tests) {
			certificates = certificates.concat(this._fcs.certificatesByTest[test]);
		}

		return certificates;
	}*/

	constructor(
		private _fjs: FreelancejobService,
		private _router: Router,
		private _fas: FreelanceapplicationService,
		private _fcs: FreelancecourseService,
		private _fts: FreelancetestService
	) {}
}