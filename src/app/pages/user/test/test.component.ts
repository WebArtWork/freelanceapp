import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancetest, FreelancetestService } from 'src/app/modules/freelancetest/services/freelancetest.service';
@Component({
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent {
	test: Freelancetest = this._fts.doc(this._router.url.replace('/test/', ''));

	constructor(
		private _fts: FreelancetestService,
		private _router: Router
	) { }
}
