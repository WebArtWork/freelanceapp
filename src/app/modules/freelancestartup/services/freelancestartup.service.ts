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
	freelancestartups: Freelancestartup[] = [];
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

		this.get().subscribe((freelancestartups: Freelancestartup[]) => this.freelancestartups.push(...freelancestartups));

		_core.on('freelancestartup_create').subscribe((freelancestartup: Freelancestartup) => {
			this.freelancestartups.push(freelancestartup);
		});

		_core.on('freelancestartup_delete').subscribe((freelancestartup: Freelancestartup) => {
			this.freelancestartups.splice(
				this.freelancestartups.findIndex((o) => o._id === freelancestartup._id),
				1
			);
		});
	}
}
