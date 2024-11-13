import { Component } from '@angular/core';
import { Freelanceinterview, FreelanceinterviewService } from 'src/app/modules/freelanceinterview/services/freelanceinterview.service';
@Component({
	templateUrl: './interviews.component.html',
	styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent {
	interviewId: Freelanceinterview[] = [];

	load(): void {
		this._fis.get({}, { name: 'public' }).subscribe((interviewId) => {
			console.log(interviewId) // Виводимо стартапи в консоль для перевірки
			this.interviewId = interviewId; // Зберігаємо отримані дані в змінній `startups`
		});
	}

	ngOnInit(): void {
		this.load(); // Викликаємо функцію `load` під час ініціалізації компонента
	}
	constructor(
		public fis: FreelanceinterviewService,
		private _fis: FreelanceinterviewService
	) { }
}
