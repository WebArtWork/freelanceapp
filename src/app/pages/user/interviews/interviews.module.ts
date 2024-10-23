import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { InterviewsComponent } from './interviews.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: InterviewsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		InterviewsComponent
	],
	providers: []

})

export class InterviewsModule { }
