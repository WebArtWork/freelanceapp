import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelancecourseService, Freelancecourse } from '../../services/freelancecourse.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('courses', {
		formId: 'courses',
		title: 'Courses',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
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
		],
	});

	config = {
		create: () => {
			this._form.modal<Freelancecourse>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
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
		],
	};

	get rows(): Freelancecourse[] {
		return this._sf.freelancecourses;
	}

	constructor(
		private _sf: FreelancecourseService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
