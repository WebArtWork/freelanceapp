import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Freelanceinterviewfeedback {
	author: string;
	isApprouved: boolean;
	grade: number;
}

export interface Freelanceinterview extends CrudDocument {
	date: Date;
	type: 'Online' | 'Phone' | 'Office';
	link: string;
	status: 'New' | 'Planned' | 'Canceled' | 'Completed';
	isApproved: boolean;
	grade: number;
	application: string;
	feedback: Freelanceinterviewfeedback[];
}

@Injectable({
	providedIn: 'root',
})
export class FreelanceinterviewService extends CrudService<Freelanceinterview> {
	freelanceinterviews: Freelanceinterview[] = this.getDocs();

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

		this.get();

		_core.on('wipe').subscribe(this.get.bind(this));
	}
}
