import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TestsComponent } from './tests.component';
import { Routes, RouterModule } from '@angular/router';
import { TestQuestionsComponent } from './test-questions/test-questions.component';

const routes: Routes = [{
	path: '',
	component: TestsComponent
},
{
	path: ':startup',
	component: TestsComponent
}, {
	path: ':certificate',
	component: TestsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		TestsComponent,
  TestQuestionsComponent
	],
	providers: []

})

export class TestsModule { }
