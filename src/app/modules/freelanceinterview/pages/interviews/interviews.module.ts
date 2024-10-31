import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { InterviewsComponent } from './interviews.component';
import { Routes, RouterModule } from '@angular/router';
import { InterviewFeedbackComponent } from './interview-feedback/interview-feedback.component';

const routes: Routes = [{
	path: '',
	component: InterviewsComponent
}, {
	path: ':application',
	component: InterviewsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		InterviewsComponent,
  InterviewFeedbackComponent
	],
	providers: []

})

export class InterviewsModule { }
