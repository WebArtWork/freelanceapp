import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ApplicationsComponent } from './applications.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: ApplicationsComponent
}, {
	path: ':job',
	component: ApplicationsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		ApplicationsComponent
	],
	providers: []

})

export class ApplicationsModule { }
