import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FreelancecommentService, Freelancecomment } from '../../services/freelancecomment.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('comments', {
		formId: 'comments',
		title: 'Comments',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill comments title',
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
						value: 'fill comments description',
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
			this._form.modal<Freelancecomment>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._sf.create(created as Freelancecomment);
					close();
				},
			});
		},
		update: (doc: Freelancecomment) => {
			this._form
				.modal<Freelancecomment>(this.form, [], doc)
				.then((updated: Freelancecomment) => {
					this._core.copy(updated, doc);
					this._sf.update(doc);
				});
		},
		delete: (doc: Freelancecomment) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Freelancecomment?'
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
				click: (doc: Freelancecomment) => {
					this._form.modalUnique<Freelancecomment>('comments', 'url', doc);
				},
			},
		],
	};

	get rows(): Freelancecomment[] {
		return this._sf.freelancecomments;
	}

	constructor(
		private _sf: FreelancecommentService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
