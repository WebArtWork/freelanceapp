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
	freelanceapplications: Freelanceapplication[] = this.getDocs();

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

		this.get();

		_core.on('wipe').subscribe(this.get.bind(this));
	}
}
