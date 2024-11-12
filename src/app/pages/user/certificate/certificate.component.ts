import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancecertificate, FreelancecertificateService } from 'src/app/modules/freelancecertificate/services/freelancecertificate.service';
@Component({
	templateUrl: './certificate.component.html',
	styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
	course: Freelancecertificate = this._fcs.doc(this._router.url.replace('/certificate/', ''));
	
	certificate: Freelancecertificate = this._fcs.doc(this._router.url.replace('/certificate/', ''));

	constructor(
		private _fcs: FreelancecertificateService,
		private _router: Router
	) { }
}
