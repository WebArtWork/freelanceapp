import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Freelancecertificate extends CrudDocument {
	granted: Date;
	grade: number;
	isCompleted: boolean;
	answer: string;
	answers: string[];
}

@Injectable({
	providedIn: 'root',
})
export class FreelancecertificateService extends CrudService<Freelancecertificate> {
	freelancecertificates: Freelancecertificate[] = [];
	certificatesByJob: Record<string, Freelancecertificate[]> = {};
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'freelancecertificate',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((freelancecertificates: Freelancecertificate[]) => this.freelancecertificates.push(...freelancecertificates));

		_core.on('freelancecertificate_create').subscribe((freelancecertificate: Freelancecertificate) => {
			this.freelancecertificates.push(freelancecertificate);
		});

		_core.on('freelancecertificate_delete').subscribe((freelancecertificate: Freelancecertificate) => {
			this.freelancecertificates.splice(
				this.freelancecertificates.findIndex((o) => o._id === freelancecertificate._id),
				1
			);
		});
	}
}
