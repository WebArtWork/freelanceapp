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
}

@Injectable({
	providedIn: 'root',
})
export class FreelanceskillService extends CrudService<Freelanceskill> {
	freelanceskills: Freelanceskill[] = [];
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

		this.get().subscribe((freelanceskills: Freelanceskill[]) => this.freelanceskills.push(...freelanceskills));

		_core.on('freelanceskill_create').subscribe((freelanceskill: Freelanceskill) => {
			this.freelanceskills.push(freelanceskill);
		});

		_core.on('freelanceskill_delete').subscribe((freelanceskill: Freelanceskill) => {
			this.freelanceskills.splice(
				this.freelanceskills.findIndex((o) => o._id === freelanceskill._id),
				1
			);
		});
	}
}
