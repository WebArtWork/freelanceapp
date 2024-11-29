import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Freelancejob extends CrudDocument {
	title: string;
	description: string;
	skills: string[];
	type: 'Fixed' | 'Hourly' | 'Weekly' | 'Monthly';
	salary: number;
	location: string;
	experience: 'New' | 'Junior' | 'Mid' | 'Senior';
	deadline: Date;
	courses: string[];
	tests: string[];
	application: string;
	startup: string;
}

@Injectable({
	providedIn: 'root',
})
export class FreelancejobService extends CrudService<Freelancejob> {
	freelancejobs: Freelancejob[] = this.getDocs();

	freelancejobsByAuthor: Record<string, Freelancejob[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'freelancejob',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.freelancejobsByAuthor);

		_core.on('wipe').subscribe(this.get.bind(this));
	}
}
