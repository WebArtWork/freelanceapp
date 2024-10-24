import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FreelanceapplicationService } from 'src/app/modules/freelanceapplication/services/freelanceapplication.service';
import { Freelancejob, FreelancejobService } from 'src/app/modules/freelancejob/services/freelancejob.service';
@Component({
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.scss']
})
export class JobComponent {
	job: Freelancejob = this._fjs.doc(this._router.url.replace('/job/', ''));

	constructor(private _fjs: FreelancejobService, private _router: Router, private _fas: FreelanceapplicationService) {}
}
