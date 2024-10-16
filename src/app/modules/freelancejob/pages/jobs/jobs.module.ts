import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { JobsComponent } from './jobs.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: JobsComponent
}, {
	path: ':startup',
	component: JobsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		JobsComponent
	],
	providers: []

})

export class JobsModule { }
