import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { StartupsComponent } from './startups.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: StartupsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [StartupsComponent]
})
export class StartupsModule {}
