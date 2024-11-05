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

	certificatesByCourse: Record<string, Freelancecertificate[]> = {};

	certificatesByTest: Record<string, Freelancecertificate[]> = {};

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

		this.get();

		this.filteredDocuments(this.certificatesByCourse, 'course');

		this.filteredDocuments(this.certificatesByTest, 'test');
	}
}