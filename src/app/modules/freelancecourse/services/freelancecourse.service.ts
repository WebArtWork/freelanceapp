import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Freelancecourse extends CrudDocument {
	cost: number;
	title: string;
	description: string;
	duration: number;
	skills: string[];
	materials: string[];
	expiration: number;
	startup: string;
}

@Injectable({
	providedIn: 'root',
})
export class FreelancecourseService extends CrudService<Freelancecourse> {
	freelancecourses: Freelancecourse[] = this.getDocs();

	freelancecoursesByAuthor: Record<string, Freelancecourse[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'freelancecourse',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.freelancecoursesByAuthor);

		_core.on('wipe').subscribe(this.get.bind(this));
	}
}
