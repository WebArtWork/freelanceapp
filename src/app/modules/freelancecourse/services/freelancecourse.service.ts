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
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class FreelancecourseService extends CrudService<Freelancecourse> {
	freelancecourses: Freelancecourse[] = [];
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

		this.get().subscribe((freelancecourses: Freelancecourse[]) => this.freelancecourses.push(...freelancecourses));

		_core.on('freelancecourse_create').subscribe((freelancecourse: Freelancecourse) => {
			this.freelancecourses.push(freelancecourse);
		});

		_core.on('freelancecourse_delete').subscribe((freelancecourse: Freelancecourse) => {
			this.freelancecourses.splice(
				this.freelancecourses.findIndex((o) => o._id === freelancecourse._id),
				1
			);
		});
	}
}
