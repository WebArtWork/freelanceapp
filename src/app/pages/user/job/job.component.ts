import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelanceapplication, FreelanceapplicationService } from 'src/app/modules/freelanceapplication/services/freelanceapplication.service';
import { Freelancecertificate, FreelancecertificateService } from 'src/app/modules/freelancecertificate/services/freelancecertificate.service';
import { Freelancejob, FreelancejobService } from 'src/app/modules/freelancejob/services/freelancejob.service';
@Component({
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.scss']
})
export class JobComponent {
	job: Freelancejob = this._fjs.doc(this._router.url.replace('/job/', ''));

	get applications(): Freelanceapplication[] {
		return this._fas.applicationsByJob[this.job._id];
	}

	get certificates(): Freelancecertificate[] {
		return this._fcs.certificatesByJob[this.job._id];
	}

	constructor(
		private _fjs: FreelancejobService,
		private _router: Router,
		private _fas: FreelanceapplicationService,
		private _fcs: FreelancecertificateService
	) { }
}
