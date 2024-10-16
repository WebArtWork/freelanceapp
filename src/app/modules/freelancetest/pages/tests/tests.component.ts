import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelancetestService, Freelancetest } from '../../services/freelancetest.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './tests.component.html',
	styleUrls: ['./tests.component.scss'],
})
export class TestsComponent {
	readonly startupId = this._router.url.includes('/tests/') ? this._router.url.replace('/tests/', '') : '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('tests', {
		formId: 'tests',
		title: 'Tests',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill tests title',
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
						value: 'fill tests description',
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
			this._form.modal<Freelancetest>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.startupId) {
						(created as Freelancetest).startup = this.startupId;
					}

					this._sf.create(created as Freelancetest);
					close();
				},
			});
		},
		update: (doc: Freelancetest) => {
			this._form
				.modal<Freelancetest>(this.form, [], doc)
				.then((updated: Freelancetest) => {
					this._core.copy(updated, doc);
					this._sf.update(doc);
				});
		},
		delete: (doc: Freelancetest) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Freelancetest?'
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
				click: (doc: Freelancetest) => {
					this._form.modalUnique<Freelancetest>('tests', 'url', doc);
				},
			},
		],
	};

	get rows(): Freelancetest[] {
		return this._sf.freelancetests;
	}

	constructor(
		private _sf: FreelancetestService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) { }
}
