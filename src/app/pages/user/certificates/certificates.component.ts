import { Component } from '@angular/core';
import { Freelancecertificate, FreelancecertificateService } from 'src/app/modules/freelancecertificate/services/freelancecertificate.service';
@Component({
	templateUrl: './certificates.component.html',
	styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {
	certificateId: Freelancecertificate[] = [];

	load(): void {
		this._fcs.get({}, { name: 'public' }).subscribe((certificateId) => {
			console.log(certificateId) // Виводимо стартапи в консоль для перевірки
			this.certificateId = certificateId; // Зберігаємо отримані дані в змінній `startups`
		});
	}

	ngOnInit(): void {
		this.load(); // Викликаємо функцію `load` під час ініціалізації компонента
	}

	constructor(
		public fcs: FreelancecertificateService,
		private _fcs: FreelancecertificateService
	) { }
}
