import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelanceapplication } from 'src/app/modules/freelanceapplication/services/freelanceapplication.service';
import { Freelancestartup, FreelancestartupService } from 'src/app/modules/freelancestartup/services/freelancestartup.service';

@Component({
	templateUrl: './startup.component.html',
	styleUrls: ['./startup.component.scss'],
})
export class StartupComponent {
	startup: Freelancestartup = this._fss.doc(this._router.url.replace('/startup/', ''));
	
	constructor(
		private _fss: FreelancestartupService,
		private _router: Router
	) {}
}
