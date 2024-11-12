import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { StartupComponent } from './startup.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: StartupComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [StartupComponent]
})
export class StartupModule {}
