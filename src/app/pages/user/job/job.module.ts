import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { JobComponent } from './job.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: JobComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		JobComponent
	],
	providers: []

})

export class JobModule { }
