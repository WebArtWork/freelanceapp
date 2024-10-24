import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CourseComponent } from './course.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: ':course_id',
	component: CourseComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		CourseComponent
	],
	providers: []

})

export class CourseModule { }
