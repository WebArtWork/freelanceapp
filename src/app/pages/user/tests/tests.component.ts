import { Component } from '@angular/core';
import { FreelancetestService } from 'src/app/modules/freelancetest/services/freelancetest.service';
@Component({
	templateUrl: './tests.component.html',
	styleUrls: ['./tests.component.scss']
})
export class TestsComponent {
	constructor(
		public fts: FreelancetestService
	) { }
}
