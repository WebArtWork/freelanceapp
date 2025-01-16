import { Component } from '@angular/core';
import { Freelancetest, FreelancetestService } from 'src/app/modules/freelancetest/services/freelancetest.service';
@Component({
	templateUrl: './tests.component.html',
	styleUrls: ['./tests.component.scss']
})
export class TestsComponent {
	tests: Freelancetest[] = [];

	load() {
		this._fts.get({}, { name: 'public' }).subscribe((tests) => {
			console.log(tests) 
			this.tests = tests;
		});
	}

	constructor(
		public fts: FreelancetestService,
		private _fts: FreelancetestService
	) {
		this.load();
	}
}
