import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { JobComponent } from './job.component';
import { Routes, RouterModule } from '@angular/router';
import { StartupComponent } from '../startup/startup.component';

const routes: Routes = [{
	path: ':job_id',
	component: JobComponent
},
{
	path: 'startup/:id', 
	component: StartupComponent
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
