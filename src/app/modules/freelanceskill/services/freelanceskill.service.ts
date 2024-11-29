import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Freelanceskill extends CrudDocument {
	name: string;
	website: string;
	courses: string;
	tests: string[];
}

@Injectable({
	providedIn: 'root',
})
export class FreelanceskillService extends CrudService<Freelanceskill> {
	freelanceskills: Freelanceskill[] = this.getDocs();

	freelanceskillsByAuthor: Record<string, Freelanceskill[]> = {};
	
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'freelanceskill',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.freelanceskillsByAuthor);
		
		_core.on('wipe').subscribe(this.get.bind(this));
	}
}
