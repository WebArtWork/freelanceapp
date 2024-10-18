import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Freelanceinterview extends CrudDocument {
	name: string;
	description: string;
	application: string;
}

@Injectable({
	providedIn: 'root',
})
export class FreelanceinterviewService extends CrudService<Freelanceinterview> {
	freelanceinterviews: Freelanceinterview[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'freelanceinterview',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((freelanceinterviews: Freelanceinterview[]) => this.freelanceinterviews.push(...freelanceinterviews));

		_core.on('freelanceinterview_create').subscribe((freelanceinterview: Freelanceinterview) => {
			this.freelanceinterviews.push(freelanceinterview);
		});

		_core.on('freelanceinterview_delete').subscribe((freelanceinterview: Freelanceinterview) => {
			this.freelanceinterviews.splice(
				this.freelanceinterviews.findIndex((o) => o._id === freelanceinterview._id),
				1
			);
		});
	}
}
