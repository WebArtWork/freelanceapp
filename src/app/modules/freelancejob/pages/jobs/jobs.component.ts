import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelancejobService, Freelancejob } from '../../services/freelancejob.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
	readonly startupId = this._router.url.includes('/jobs/') ? this._router.url.replace('/jobs/', '') : '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('jobs', {
		formId: 'jobs',
		title: 'Jobs',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill jobs title',
					},
					{
						name: 'Label',
						value: 'Title',
					},
				],
			},
			{
				name: 'Text',
				key: 'description',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill jobs description',
					},
					{
						name: 'Label',
						value: 'Description',
					},
				],
			},
		],
	});

	config = {
		create: () => {
			this._form.modal<Freelancejob>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.startupId) {
						(created as Freelancejob).startup = this.startupId;
					}

					this._sf.create(created as Freelancejob);

					close();
				},
			});
		},
		update: (doc: Freelancejob) => {
			this._form
				.modal<Freelancejob>(this.form, [], doc)
				.then((updated: Freelancejob) => {
					this._core.copy(updated, doc);

					this._sf.update(doc);
				});
		},
		delete: (doc: Freelancejob) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Freelancejob?'
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
				click: (doc: Freelancejob) => {
					this._form.modalUnique<Freelancejob>('jobs', 'url', doc);
				},
			},
		],
	};

	get rows(): Freelancejob[] {
		return this._sf.freelancejobs;
	}

	constructor(
		private _sf: FreelancejobService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
