import { Component } from '@angular/core';
import { FreelancejobService } from 'src/app/modules/freelancejob/services/freelancejob.service';
import { Freelancestartup, FreelancestartupService } from 'src/app/modules/freelancestartup/services/freelancestartup.service';

@Component({
	templateUrl: './startups.component.html',
	styleUrls: ['./startups.component.scss'],
})
export class StartupsComponent {
	startups: Freelancestartup[] = [];

	load() {
		this._fss.get({}, { name: 'public' }).subscribe((startups) => {
			console.log(startups)
			this.startups = startups;
		});
	}

	constructor(
		private _fss: FreelancestartupService,
		public fss: FreelancestartupService
	) {
		this.load();
	}
}
