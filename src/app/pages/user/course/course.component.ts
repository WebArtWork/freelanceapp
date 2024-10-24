import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancecourse, FreelancecourseService } from 'src/app/modules/freelancecourse/services/freelancecourse.service';
@Component({
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.scss']
})
export class CourseComponent {
	course: Freelancecourse = this._fcs.doc(this._router.url.replace('/course/', ''));

	constructor (
		private _fcs: FreelancecourseService,
		private _router: Router
	) { }
}
