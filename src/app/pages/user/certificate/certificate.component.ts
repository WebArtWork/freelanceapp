import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancecertificate, FreelancecertificateService } from 'src/app/modules/freelancecertificate/services/freelancecertificate.service';
@Component({
	templateUrl: './certificate.component.html',
	styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
	certificateId: string = this._router.url.replace('/certificate/', '');

	certificate: Freelancecertificate = {} as Freelancecertificate;
	
	load() {
		this._fcs.fetch({
			_id: this.certificateId
		}, {
			name: 'public'
		}).subscribe(certificate => this.certificate = certificate);
	}

	constructor(
		private _fcs: FreelancecertificateService,
		private _router: Router
	) {
		this.load();
	}
}
