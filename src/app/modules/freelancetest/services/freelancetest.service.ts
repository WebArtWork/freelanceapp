import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Freelancetest extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class FreelancetestService extends CrudService<Freelancetest> {
	freelancetests: Freelancetest[] = [];
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

		this.get().subscribe((freelancetests: Freelancetest[]) => this.freelancetests.push(...freelancetests));

		_core.on('freelancetest_create').subscribe((freelancetest: Freelancetest) => {
			this.freelancetests.push(freelancetest);
		});

		_core.on('freelancetest_delete').subscribe((freelancetest: Freelancetest) => {
			this.freelancetests.splice(
				this.freelancetests.findIndex((o) => o._id === freelancetest._id),
				1
			);
		});
	}
}
