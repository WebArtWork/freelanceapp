import { Component } from '@angular/core';
import { Freelancecertificate, FreelancecertificateService } from 'src/app/modules/freelancecertificate/services/freelancecertificate.service';
@Component({
	templateUrl: './certificates.component.html',
	styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {
	certificates: Freelancecertificate[] = [];

	load() {
		this._fcs.get({}, { name: 'public' }).subscribe((certificates) => {
			console.log(certificates) 
			this.certificates = certificates;
		});
	}

	constructor(
		public fcs: FreelancecertificateService,
		private _fcs: FreelancecertificateService
	) {
		this.load();
	}
}
