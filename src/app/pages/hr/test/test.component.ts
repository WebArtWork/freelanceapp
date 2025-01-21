import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancetest, FreelancetestService } from 'src/app/modules/freelancetest/services/freelancetest.service';
@Component({
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent {
	testId: string = this._router.url.replace('/hr/test/', '');
	
	test: Freelancetest = {} as Freelancetest;

	load() {
		this._fts.fetch({
			_id: this.testId
		}, {
			name: 'public'
		}).subscribe(test => this.test = test);
	}

	constructor(
		private _fts: FreelancetestService,
		private _router: Router
	) {
		this.load();
	}
}
