import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Freelancestartup extends CrudDocument {
	name: string;
	description: string;
	currency: string;
	industry: string[];
	stage: string[];
	stakeholders: string[];
	competetives: string[];
	socials: string[];
	pitchDeck: string;
}

@Injectable({
	providedIn: 'root',
})
export class FreelancestartupService extends CrudService<Freelancestartup> {
	freelancestartups: Freelancestartup[] = this.getDocs();

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'freelancestartup',
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
