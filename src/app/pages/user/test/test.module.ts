import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TestComponent } from './test.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: TestComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		TestComponent
	],
	providers: []

})

export class TestModule { }
