import { Component } from '@angular/core';
import { Freelancetest, FreelancetestService } from 'src/app/modules/freelancetest/services/freelancetest.service';
@Component({
	templateUrl: './tests.component.html',
	styleUrls: ['./tests.component.scss']
})
export class TestsComponent {
	testId: Freelancetest[] = [];

	load(): void {
		this._fts.get({}, { name: 'public' }).subscribe((testId) => {
			console.log(testId) // Виводимо стартапи в консоль для перевірки
			this.testId = testId; // Зберігаємо отримані дані в змінній `startups`
		});
	}

	ngOnInit(): void {
		this.load(); // Викликаємо функцію `load` під час ініціалізації компонента
	}
	constructor(
		public fts: FreelancetestService,
		private _fts: FreelancetestService
	) { }
}
