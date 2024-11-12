import { Component } from '@angular/core';
import { Freelancestartup, FreelancestartupService } from 'src/app/modules/freelancestartup/services/freelancestartup.service';

@Component({
	templateUrl: './startups.component.html',
	styleUrls: ['./startups.component.scss'],
})
export class StartupsComponent {
	get startup(): Freelancestartup[] {
		return this._fss.freelancestartups;
	}

	constructor(
		private _fss: FreelancestartupService
	) { }
}
