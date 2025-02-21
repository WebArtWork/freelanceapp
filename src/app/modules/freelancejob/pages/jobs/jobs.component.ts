import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelancejobService, Freelancejob } from '../../services/freelancejob.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { Router } from '@angular/router';
import { FreelanceskillService } from 'src/app/modules/freelanceskill/services/freelanceskill.service';
import { FreelancecourseService } from 'src/app/modules/freelancecourse/services/freelancecourse.service';
import { FreelancetestService } from 'src/app/modules/freelancetest/services/freelancetest.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
	readonly startupId = this._router.url.includes('/manage/jobs/') ? this._router.url.replace('/manage/jobs/', '') : '';

	columns = ['title', 'type', 'salary', 'experience'];

	form: FormInterface = this._form.getForm('jobs', {
		formId: 'jobs',
		title: 'Jobs',
		components: [
			{
				name: 'Text',
				key: 'title',
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
			{
				name: 'Select',
				key: 'skills',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill jobs skills',
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
				name: 'Select',
				key: 'type',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill jobs type',
					},
					{
						name: 'Label',
						value: 'Type',
					},
					{
						name: 'Items',
						value: ['Fixed', 'Hourly', 'Weekly', 'Monthly']
					},
				],
			},
			{
				name: 'Number',
				key: 'salary',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill jobs salary',
					},
					{
						name: 'Label',
						value: 'Salary',
					},
				],
			},
			{
				name: 'Text',
				key: 'location',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill jobs location',
					},
					{
						name: 'Label',
						value: 'Location',
					},
				],
			},
			{
				name: 'Select',
				key: 'experience',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill jobs experience',
					},
					{
						name: 'Label',
						value: 'Experience',
					},
					{
						name: 'Items',
						value: ['New', 'Junior', 'Mid', 'Senior']
					},
				],
			},
			{
				name: 'Date',
				key: 'deadline',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill jobs deadline',
					},
					{
						name: 'Label',
						value: 'Deadline',
					},
				],
			},
			{
				name: 'Select',
				key: 'courses',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill jobs course',
					},
					{
						name: 'Label',
						value: 'Course',
					},
					{
						name: 'Items',
						value: this._fcs.freelancecourses
					},
					{
						name: 'Multiple',
						value: true
					},
					{
						name: 'Name',
						value: 'title'
					}
				],
			},
			{
				name: 'Select',
				key: 'tests',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill jobs test',
					},
					{
						name: 'Label',
						value: 'Test',
					},
					{
						name: 'Items',
						value: this._fts.freelancetests
					},
					{
						name: 'Multiple',
						value: true
					},
					{
						name: 'Name',
						value: 'title'
					}
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
			{
				icon: 'description',
				hrefFunc: (doc: Freelancejob) => {
					return '/manage/applications/' + doc._id;
				},
			},
		],
	};

	get rows(): Freelancejob[] {
		return this._sf.freelancejobsByAuthor[this._us.user._id];
	}

	constructor(
		private _sf: FreelancejobService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _fss: FreelanceskillService,
		private _fcs: FreelancecourseService,
		private _fts: FreelancetestService,
		private _us: UserService
	) {}
}
