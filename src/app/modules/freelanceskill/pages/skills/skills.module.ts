import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SkillsComponent } from './skills.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: SkillsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		SkillsComponent
	],
	providers: []

})

export class SkillsModule { }
