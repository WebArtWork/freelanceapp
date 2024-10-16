import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CollapseComponent } from './collapse.component';

@NgModule({
	imports: [CoreModule],
	declarations: [CollapseComponent],
	providers: [],
	exports: [CollapseComponent]
})
export class CollapseModule {}
