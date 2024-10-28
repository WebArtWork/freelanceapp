import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { InterviewComponent } from './interview.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: ':interview_id',
	component: InterviewComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		InterviewComponent
	],
	providers: []

})

export class InterviewModule { }
