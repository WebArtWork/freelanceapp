import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelancecertificateService, Freelancecertificate } from '../../services/freelancecertificate.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './certificates.component.html',
	styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent {
	readonly courseId = this._router.url.includes('/certificates/') ? this._router.url.replace('/certificates/', '') : '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('certificates', {
		formId: 'certificates',
		title: 'Certificates',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill certificates title',
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
						value: 'fill certificates description',
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
			this._form.modal<Freelancecertificate>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.courseId) {
						(created as Freelancecertificate).course = this.courseId;
					}

					this._sf.create(created as Freelancecertificate);
					close();
				},
			});
		},
		update: (doc: Freelancecertificate) => {
			this._form
				.modal<Freelancecertificate>(this.form, [], doc)
				.then((updated: Freelancecertificate) => {
					this._core.copy(updated, doc);
					this._sf.update(doc);
				});
		},
		delete: (doc: Freelancecertificate) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Freelancecertificate?'
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
				click: (doc: Freelancecertificate) => {
					this._form.modalUnique<Freelancecertificate>('certificates', 'url', doc);
				},
			},
		],
	};

	get rows(): Freelancecertificate[] {
		return this._sf.freelancecertificates;
	}

	constructor(
		private _sf: FreelancecertificateService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
