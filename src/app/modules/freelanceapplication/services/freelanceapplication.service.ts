import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Freelanceapplication extends CrudDocument {
	cover: string;
	description: string;
	status: 'New' | 'Seen' | 'Rejected' | 'Interview' | 'Accepted' | 'Ended';
	tests: string[];
	links: string[];
	skills: string[];
	job: string;
}

@Injectable({
	providedIn: 'root',
})
export class FreelanceapplicationService extends CrudService<Freelanceapplication> {
	freelanceapplications: Freelanceapplication[] = [];
	applicationsByJob: Record<string, Freelanceapplication[]> = {};
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'freelanceapplication',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((freelanceapplications: Freelanceapplication[]) => this.freelanceapplications.push(...freelanceapplications));

		_core.on('freelanceapplication_create').subscribe((freelanceapplication: Freelanceapplication) => {
			this.freelanceapplications.push(freelanceapplication);
		});

		_core.on('freelanceapplication_delete').subscribe((freelanceapplication: Freelanceapplication) => {
			this.freelanceapplications.splice(
				this.freelanceapplications.findIndex((o) => o._id === freelanceapplication._id),
				1
			);
		});
		this.filteredDocuments(this.applicationsByJob, 'job');
	}
}
