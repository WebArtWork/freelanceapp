import { Component } from '@angular/core';
import { FreelancejobService } from 'src/app/modules/freelancejob/services/freelancejob.service';

@Component({
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
	constructor(
		public fjs: FreelancejobService
	) { }
}
