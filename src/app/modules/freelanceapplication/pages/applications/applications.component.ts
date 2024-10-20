import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelanceapplicationService, Freelanceapplication } from '../../services/freelanceapplication.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './applications.component.html',
	styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent {
	readonly jobId = this._router.url.includes('/applications/') ? this._router.url.replace('/applications/', '') : '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('applications', {
		formId: 'applications',
		title: 'Applications',
		components: [
			{
				name: 'Text',
				key: 'description',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill applications description',
					},
					{
						name: 'Label',
						value: 'Description',
					},
				],
			},
			{
				name: 'Select',
				key: 'status',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill applications status',
					},
					{
						name: 'Label',
						value: 'Status',
					},
					{
						name: 'Items',
						value: ['New', 'Seen', 'Rejected', 'Interview', 'Accepted', 'Ended']
					}
				],
			},
		],
	});

	config = {
		create: () => {
			this._form.modal<Freelanceapplication>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.jobId) {
						(created as Freelanceapplication).job = this.jobId;
					}

					this._sf.create(created as Freelanceapplication);
					close();
				},
			});
		},
		update: (doc: Freelanceapplication) => {
			this._form
				.modal<Freelanceapplication>(this.form, [], doc)
				.then((updated: Freelanceapplication) => {
					this._core.copy(updated, doc);
					this._sf.update(doc);
				});
		},
		delete: (doc: Freelanceapplication) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Freelanceapplication?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: () => {
							this._sf.delete(doc);
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Freelanceapplication) => {
					this._form.modalUnique<Freelanceapplication>('applications', 'url', doc);
				},
			},
			{
				icon: 'record_voice_over',
				hrefFunc: (doc: Freelanceapplication) => {
					return '/interviews/' + doc._id;
				},
			},
		],
	};

	get rows(): Freelanceapplication[] {
		return this._sf.freelanceapplications;
	}

	constructor(
		private _sf: FreelanceapplicationService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) { }
}
