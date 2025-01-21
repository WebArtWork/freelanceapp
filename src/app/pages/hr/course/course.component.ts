import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancecourse, FreelancecourseService } from 'src/app/modules/freelancecourse/services/freelancecourse.service';
import { Freelancetest, FreelancetestService } from 'src/app/modules/freelancetest/services/freelancetest.service';
@Component({
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.scss']
})
export class CourseComponent {
	courseId: string = this._router.url.replace('/hr/course/', '');
	
	course: Freelancecourse = {} as Freelancecourse;

	load() {
		this._fcs.fetch({
			_id: this.courseId
		}, {
			name: 'public'
		}).subscribe(course => this.course = course);
	}

	constructor(
		private _fcs: FreelancecourseService,
		private _router: Router,
		private _fts: FreelancetestService
	) {
		this.load();
	}
}
