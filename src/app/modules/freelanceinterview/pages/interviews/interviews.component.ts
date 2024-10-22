import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelanceinterviewService, Freelanceinterview } from '../../services/freelanceinterview.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './interviews.component.html',
	styleUrls: ['./interviews.component.scss'],
})
export class InterviewsComponent {
	readonly applicationId = this._router.url.includes('/interviews/') ? this._router.url.replace('/interviews/', '') : '';

	columns = ['type', 'status', 'grade'];

	form: FormInterface = this._form.getForm('interviews', {
		formId: 'interviews',
		title: 'Interviews',
		components: [
			{
				name: 'Select',
				key: 'type',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill interviews type',
					},
					{
						name: 'Label',
						value: 'Type',
					},
					{
						name: 'Items',
						value: ['Online', 'Phone', 'Office']
					}
				],
			},
			{
				name: 'Select',
				key: 'status',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill interviews status',
					},
					{
						name: 'Label',
						value: 'Status',
					},
					{
						name: 'Items',
						value: ['New', 'Planned', 'Canceled', 'Completed']
					}
				],
			},
			{
				name: 'Number',
				key: 'grade',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill interviews grade',
					},
					{
						name: 'Label',
						value: 'Grade',
					},
				],
			},
		],
	});

	config = {
		create: () => {
			this._form.modal<Freelanceinterview>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.applicationId) {
						(created as Freelanceinterview).application = this.applicationId;
					}

					this._sf.create(created as Freelanceinterview);
					close();
				},
			});
		},
		update: (doc: Freelanceinterview) => {
			this._form
				.modal<Freelanceinterview>(this.form, [], doc)
				.then((updated: Freelanceinterview) => {
					this._core.copy(updated, doc);
					this._sf.update(doc);
				});
		},
		delete: (doc: Freelanceinterview) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Freelanceinterview?'
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
				click: (doc: Freelanceinterview) => {
					this._form.modalUnique<Freelanceinterview>('interviews', 'url', doc);
				},
			},
		],
	};

	get rows(): Freelanceinterview[] {
		return this._sf.freelanceinterviews;
	}

	constructor(
		private _sf: FreelanceinterviewService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
