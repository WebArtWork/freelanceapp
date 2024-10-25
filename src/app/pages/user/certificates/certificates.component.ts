import { Component } from '@angular/core';
import { FreelancecertificateService } from 'src/app/modules/freelancecertificate/services/freelancecertificate.service';
@Component({
	templateUrl: './certificates.component.html',
	styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {
	constructor(
		public fcs: FreelancecertificateService
	) { }
}
