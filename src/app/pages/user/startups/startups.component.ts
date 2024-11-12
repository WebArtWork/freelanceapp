import { Component } from '@angular/core';
import { Freelancestartup, FreelancestartupService } from 'src/app/modules/freelancestartup/services/freelancestartup.service';

@Component({
	templateUrl: './startups.component.html',
	styleUrls: ['./startups.component.scss'],
})
export class StartupsComponent {
	startups: any[] = [];

	load(): void {
		this._fss.get({page: 1}, {name: 'public'}).subscribe((startups) => {
			console.log(startups); // Виводимо стартапи в консоль для перевірки
			this.startups = startups; // Зберігаємо отримані дані в змінній `startups`
		});
	}

	ngOnInit(): void {
		this.load(); // Викликаємо функцію `load` під час ініціалізації компонента
	}

	constructor(
		private _fss: FreelancestartupService
	) {}
}
