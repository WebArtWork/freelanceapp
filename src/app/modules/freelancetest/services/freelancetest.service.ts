import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Freelancetestquestion {
	text: string;
	type: 'Text' | 'Radio' | 'Checkbox' | 'ArrayTexts' | 'TwoArrayConnects',
	answers: string[];
	connectTo: string[];
}

export interface Freelancetest extends CrudDocument {
	title: string;
	description: string;
	cost: number;
	duration: number;
	skills: string[];
	startup: string;
	questions: Freelancetestquestion[];
}

@Injectable({
	providedIn: 'root',
})
export class FreelancetestService extends CrudService<Freelancetest> {
	freelancetests: Freelancetest[] = this.getDocs();

	freelancetestsByAuthor: Record<string, Freelancetest[]> = {};
	
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'freelancetest',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.freelancetestsByAuthor);

		_core.on('wipe').subscribe(this.get.bind(this));
	}
}
