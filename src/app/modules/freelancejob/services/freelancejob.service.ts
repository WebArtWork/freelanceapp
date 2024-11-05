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
	courses: string;
	tests: string;
	startup: string;
}

@Injectable({
	providedIn: 'root',
})
export class FreelancejobService extends CrudService<Freelancejob> {
	freelancejobs: Freelancejob[] = [];

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

		this.get().subscribe((freelancejobs: Freelancejob[]) => this.freelancejobs.push(...freelancejobs));

		_core.on('freelancejob_create').subscribe((freelancejob: Freelancejob) => {
			this.freelancejobs.push(freelancejob);
		});

		_core.on('freelancejob_delete').subscribe((freelancejob: Freelancejob) => {
			this.freelancejobs.splice(
				this.freelancejobs.findIndex((o) => o._id === freelancejob._id),
				1
			);
		});
	}
}
