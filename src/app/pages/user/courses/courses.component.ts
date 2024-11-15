import { Component } from '@angular/core';
import { Freelancecourse, FreelancecourseService } from 'src/app/modules/freelancecourse/services/freelancecourse.service';
@Component({
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
	courses: Freelancecourse[] = [];

	load() {
		this._fcs.get({}, { name: 'public' }).subscribe((courses) => {
			console.log(courses) 
			this.courses = courses; 
		});
	}

	constructor(
		public fcs: FreelancecourseService,
		private _fcs: FreelancecourseService
	) {
		this.load();
	}
}
