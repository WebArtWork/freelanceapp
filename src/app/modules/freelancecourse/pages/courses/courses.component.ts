import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelancecourseService, Freelancecourse } from '../../services/freelancecourse.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';
import { FreelanceskillService } from 'src/app/modules/freelanceskill/services/freelanceskill.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
	readonly startupId = this._router.url.includes('/manage/courses/') ? this._router.url.replace('/manage/courses/', '') : '';

	columns = ['title', 'description', 'duration', 'expiration'];

	form: FormInterface = this._form.getForm('courses', {
		formId: 'courses',
		title: 'Courses',
		components: [
			{
				name: 'Number',
				key: 'cost',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill courses cost',
					},
					{
						name: 'Label',
						value: 'Cost',
					},
				],
			},
			{
				name: 'Text',
				key: 'title',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill courses title',
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
						value: 'fill courses description',
					},
					{
						name: 'Label',
						value: 'Description',
					},
				],
			},
			{
				name: 'Number',
				key: 'duration',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill courses duration',
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
						value: 'fill courses skills',
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
					},
				],
			},
			{
				name: 'Tags',
				key: 'materials',
				fields: [
					{
						name: 'Button',
						value: 'Add material',
					},
					{
						name: 'Placeholder',
						value: 'fill courses materials',
					},
					{
						name: 'Label',
						value: 'Materials',
					}
				],
			},
			{
				name: 'Number',
				key: 'expiration',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill courses expiration',
					},
					{
						name: 'Label',
						value: 'Expiration',
					},
				],
			},
		],
	});

	config = {
		create: () => {
			this._form.modal<Freelancecourse>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.startupId) {
						(created as Freelancecourse).startup = this.startupId;
					}

					this._sf.create(created as Freelancecourse);
					close();
				},
			});
		},
		update: (doc: Freelancecourse) => {
			this._form
				.modal<Freelancecourse>(this.form, [], doc)
				.then((updated: Freelancecourse) => {
					this._core.copy(updated, doc);
					this._sf.update(doc);
				});
		},
		delete: (doc: Freelancecourse) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Freelancecourse?'
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
				click: (doc: Freelancecourse) => {
					this._form.modalUnique<Freelancecourse>('courses', 'url', doc);
				},
			},
			{
				icon: 'verified',
				hrefFunc: (doc: Freelancecourse) => {
					return '/manage/certificates/course/' + doc._id;
				},
			},
		],
	};

	get rows(): Freelancecourse[] {
		return this._sf.freelancecoursesByAuthor[this._us.user._id];
	}

	constructor(
		private _sf: FreelancecourseService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _fss: FreelanceskillService,
		private _us: UserService
	) { }
}
