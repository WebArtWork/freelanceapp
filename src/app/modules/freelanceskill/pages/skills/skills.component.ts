import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelanceskillService, Freelanceskill } from '../../services/freelanceskill.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
	columns = ['name', 'website'];

	form: FormInterface = this._form.getForm('skills', {
		formId: 'skills',
		title: 'Skills',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill skills name',
					},
					{
						name: 'Label',
						value: 'Name',
					},
				],
			},
			{
				name: 'Text',
				key: 'website',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill skills website',
					},
					{
						name: 'Label',
						value: 'Website',
					},
				],
			},
		],
	});

	config = {
		create: () => {
			this._form.modal<Freelanceskill>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._sf.create(created as Freelanceskill);
					close();
				},
			});
		},
		update: (doc: Freelanceskill) => {
			this._form
				.modal<Freelanceskill>(this.form, [], doc)
				.then((updated: Freelanceskill) => {
					this._core.copy(updated, doc);
					this._sf.update(doc);
				});
		},
		delete: (doc: Freelanceskill) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Freelanceskill?'
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
				click: (doc: Freelanceskill) => {
					this._form.modalUnique<Freelanceskill>('skills', 'url', doc);
				},
			},
		],
	};

	get rows(): Freelanceskill[] {
		return this._sf.freelanceskills;
	}

	constructor(
		private _sf: FreelanceskillService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
