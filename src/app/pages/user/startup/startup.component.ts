import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancecourse, FreelancecourseService } from 'src/app/modules/freelancecourse/services/freelancecourse.service';
import { Freelancejob, FreelancejobService } from 'src/app/modules/freelancejob/services/freelancejob.service';
import { Freelancestartup, FreelancestartupService } from 'src/app/modules/freelancestartup/services/freelancestartup.service';

@Component({
	templateUrl: './startup.component.html',
	styleUrls: ['./startup.component.scss'],
})
export class StartupComponent {
	startup: Freelancestartup = this._fss.doc(this._router.url.replace('/startup/', ''));
	startupId: Freelancestartup[] = [];
	
	load(): void {
		this._fjs.get({ query: '&startup=' + this.startupId }, {name: 'public'}).subscribe((jobs)=>{ console.log(jobs) });

		this._fcs.get({ query: '&startup=' + this.startupId }, {name: 'public'}).subscribe((courses)=>{ console.log(courses) });
	}

	get jobs(): Freelancejob[] {
		return this._fjs.jobsByStartup[this.startup._id];
	}

	get courses(): Freelancecourse[] {
		return this._fcs.coursesByStartup[this.startup._id];
	}

	constructor(
		private _fss: FreelancestartupService,
		private _router: Router,
		private _fjs: FreelancejobService,
		private _fcs: FreelancecourseService
	) {}
}
