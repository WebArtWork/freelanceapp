import { Component } from '@angular/core';
import { Freelancecourse, FreelancecourseService } from 'src/app/modules/freelancecourse/services/freelancecourse.service';
@Component({
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
	courseId: Freelancecourse[] = [];

	load(): void {
		this._fcs.get({}, { name: 'public' }).subscribe((courseId) => {
			console.log(courseId) // Виводимо стартапи в консоль для перевірки
			this.courseId = courseId; // Зберігаємо отримані дані в змінній `startups`
		});
	}

	ngOnInit(): void {
		this.load(); // Викликаємо функцію `load` під час ініціалізації компонента
	}

	constructor(
		public fcs: FreelancecourseService,
		private _fcs: FreelancecourseService
	) { }
}
