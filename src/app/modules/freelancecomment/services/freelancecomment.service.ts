import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Freelancecomment extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class FreelancecommentService extends CrudService<Freelancecomment> {
	freelancecomments: Freelancecomment[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'freelancecomment',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((freelancecomments: Freelancecomment[]) => this.freelancecomments.push(...freelancecomments));

		_core.on('freelancecomment_create').subscribe((freelancecomment: Freelancecomment) => {
			this.freelancecomments.push(freelancecomment);
		});

		_core.on('freelancecomment_delete').subscribe((freelancecomment: Freelancecomment) => {
			this.freelancecomments.splice(
				this.freelancecomments.findIndex((o) => o._id === freelancecomment._id),
				1
			);
		});
	}
}
