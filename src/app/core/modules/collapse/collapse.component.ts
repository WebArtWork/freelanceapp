import { Component, Input } from '@angular/core';
import { Collapse } from './collapse.interface';

@Component({
	selector: 'wcollapse',
	templateUrl: './collapse.component.html',
	styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent {
	@Input() config: Collapse;

	toggle(): void {
		this.config.show = !this.config.show;
	}

	open(): void {
		this.config.show = true;
	}

	close(): void {
		this.config.show = false;
	}

	constructor() {
		this.config = this.config || ({} as Collapse);

		this.config.show =
			typeof this.config.show === 'boolean' ? this.config.show : true;

		this.config.toggle = this.config.toggle || this.toggle.bind(this);

		this.config.open = this.config.open || this.open.bind(this);

		this.config.close = this.config.close || this.close.bind(this);
	}
}