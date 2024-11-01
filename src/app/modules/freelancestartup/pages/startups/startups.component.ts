import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelancestartupService, Freelancestartup } from '../../services/freelancestartup.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './startups.component.html',
	styleUrls: ['./startups.component.scss'],
})
export class StartupsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('startups', {
		formId: 'startups',
		title: 'Startups',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill startups title',
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
						value: 'fill startups description',
					},
					{
						name: 'Label',
						value: 'Description',
					},
				],
			},
			{
				name: 'Text',
				key: 'currency',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill startups currency',
					},
					{
						name: 'Label',
						value: 'Currency',
					},
				],
			},
			{
				name: 'Text',
				key: 'pitchDeck',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill startups pitchDeck',
					},
					{
						name: 'Label',
						value: 'PitchDeck',
					},
				],
			},
		],
	});

	config = {
		create: () => {
			this._form.modal<Freelancestartup>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._sf.create(created as Freelancestartup);
					close();
				},
			});
		},
		update: (doc: Freelancestartup) => {
			this._form
				.modal<Freelancestartup>(this.form, [], doc)
				.then((updated: Freelancestartup) => {
					this._core.copy(updated, doc);
					this._sf.update(doc);
				});
		},
		delete: (doc: Freelancestartup) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Freelancestartup?'
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
				click: (doc: Freelancestartup) => {
					this._form.modalUnique<Freelancestartup>('startups', 'url', doc);
				},
			},
			{
				icon: 'work',
				hrefFunc: (doc: Freelancestartup) => {
					return '/manage/jobs/' + doc._id;
				},
			},
			{
				icon: 'menu_book',
				hrefFunc: (doc: Freelancestartup) => {
					return '/manage/courses/' + doc._id;
				},
			},
			{
				icon: 'quiz',
				hrefFunc: (doc: Freelancestartup) => {
					return '/manage/tests/' + doc._id;
				},
			},
		],
	};

	get rows(): Freelancestartup[] {
		return this._sf.freelancestartups;
	}

	constructor(
		private _sf: FreelancestartupService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
