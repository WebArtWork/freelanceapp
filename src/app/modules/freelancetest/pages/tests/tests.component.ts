import { Component } from '@angular/core';
import { AlertService, CoreService, ModalService } from 'wacom';
import { FreelancetestService, Freelancetest } from '../../services/freelancetest.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';
import { FreelanceskillService } from 'src/app/modules/freelanceskill/services/freelanceskill.service';
import { TestQuestionsComponent } from './test-questions/test-questions.component';

@Component({
	templateUrl: './tests.component.html',
	styleUrls: ['./tests.component.scss'],
})
export class TestsComponent {
	readonly startupId = this._router.url.includes('/tests/') ? this._router.url.replace('/tests/', '') : '';
	readonly certificateId = this._router.url.includes('/tests/') ? this._router.url.replace('/tests/', '') : '';

	columns = ['title', 'description', 'duration'];

	form: FormInterface = this._form.getForm('tests', {
		formId: 'tests',
		title: 'Tests',
		components: [
			{
				name: 'Text',
				key: 'title',
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
			{
				name: 'Number',
				key: 'cost',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill tests cost',
					},
					{
						name: 'Label',
						value: 'Cost',
					},
				],
			},
			{
				name: 'Number',
				key: 'duration',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill tests duration',
					},
					{
						name: 'Label',
						value: 'Duration',
					},
				],
			},
			{
				name: 'Select',
				key: 'skills',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill tests skills',
					},
					{
						name: 'Label',
						value: 'Skills',
					},
					{
						name: 'Items',
						value: this._fss.freelanceskills
					},
					{
						name: 'Multiple',
						value: true
					}
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

					if (this.certificateId) {
						(created as Freelancetest).certificate = this.certificateId;
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
			{
				icon: 'cloud_download',
				click: (test: Freelancetest) => {
					test.questions = test.questions || [];
					this._modal.show({
						component: TestQuestionsComponent,
						test
					});
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
		private _router: Router,
		private _fss: FreelanceskillService,
		private _modal: ModalService
	) { }
}
