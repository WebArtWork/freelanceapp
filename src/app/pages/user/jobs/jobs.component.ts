import { Component } from '@angular/core';
import { Freelancejob, FreelancejobService } from 'src/app/modules/freelancejob/services/freelancejob.service';

@Component({
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
	jobId: Freelancejob[] = [];

	load(): void {
		this._fjs.get({}, { name: 'public' }).subscribe((jobId) => {
			console.log(jobId) // Виводимо стартапи в консоль для перевірки
			this.jobId = jobId; // Зберігаємо отримані дані в змінній `startups`
		});
	}

	ngOnInit(): void {
		this.load(); // Викликаємо функцію `load` під час ініціалізації компонента
	}

	constructor(
		public fjs: FreelancejobService,
		private _fjs: FreelancejobService
	) { }
}
