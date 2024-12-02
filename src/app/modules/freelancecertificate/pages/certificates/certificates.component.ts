import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelancecertificateService, Freelancecertificate } from '../../services/freelancecertificate.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './certificates.component.html',
	styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent {
	readonly courseId = this._router.url.includes('/manage/certificates/course/') ? this._router.url.replace('/manage/certificates/course/', '') : '';

	readonly testId = this._router.url.includes('/manage/certificates/test/') ? this._router.url.replace('/manage/certificates/test/', '') : '';

	columns = ['granted', 'grade', 'isCompleted', 'answer'];

	form: FormInterface = this._form.getForm('certificates', {
		formId: 'certificates',
		title: 'Certificates',
		components: [
			{
				name: 'Date',
				key: 'granted',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill certificates granted',
					},
					{
						name: 'Label',
						value: 'Granted',
					},
				],
			},
			{
				name: 'Number',
				key: 'grade',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill certificates grade',
					},
					{
						name: 'Label',
						value: 'Grade',
					},
				],
			},
			{
				name: 'Boolean',
				key: 'isCompleted',
				fields: [
					{
						name: 'Label',
						value: 'Is Completed',
					},
				],
			},
			{
				name: 'Text',
				key: 'answer',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill certificates answer',
					},
					{
						name: 'Label',
						value: 'Answer',
					},
				],
			},
			{
				name: 'Tags',
				key: 'answers',
				fields: [
					{
						name: 'Button',
						value: 'Add answer',
					},
					{
						name: 'Placeholder',
						value: 'fill certificates answers',
					},
					{
						name: 'Label',
						value: 'Answers',
					}
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

					if (this.testId) {
						(created as Freelancecertificate).test = this.testId;
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
		return this._sf.freelancecertificatesByAuthor[this._us.user._id];
	}

	constructor(
		private _sf: FreelancecertificateService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _us: UserService
	) { }
}
