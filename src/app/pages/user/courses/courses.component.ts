import { Component } from '@angular/core';
import { FreelancecourseService } from 'src/app/modules/freelancecourse/services/freelancecourse.service';
@Component({
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
	constructor (
		public fcs: FreelancecourseService
	) { }
}
