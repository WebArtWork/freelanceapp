import { Component } from '@angular/core';
import { FreelancejobService } from 'src/app/modules/freelancejob/services/freelancejob.service';
import { Freelancestartup, FreelancestartupService } from 'src/app/modules/freelancestartup/services/freelancestartup.service';

@Component({
	templateUrl: './startups.component.html',
	styleUrls: ['./startups.component.scss'],
})
export class StartupsComponent {
	startupId: Freelancestartup[] = [];

	load(): void {
		this._fss.get({}, { name: 'public' }).subscribe((startupId) => {
			console.log(startupId) // Виводимо стартапи в консоль для перевірки
			this.startupId = startupId; // Зберігаємо отримані дані в змінній `startups`
		});
	}

	ngOnInit(): void {
		this.load(); // Викликаємо функцію `load` під час ініціалізації компонента
	}

	constructor(
		private _fss: FreelancestartupService,
		public fss: FreelancestartupService
	) { }
}
