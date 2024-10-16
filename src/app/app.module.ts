import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Renderer2 } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { AlertModule } from './core/modules/alert/alert.module';
import { ModalModule } from './core/modules/modal/modal.module';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'test',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Test'
					}
				},
				loadChildren: () => import('./pages/guest/test/test.module').then(m => m.TestModule)
			},
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () => import('./pages/guest/components/components.module').then(m => m.ComponentsModule)
			},
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			},
			{
				path: 'jobs',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Jobs'
					}
				},
				loadChildren: () =>
					import('./modules/freelancejob/pages/jobs/jobs.module').then(
						(m) => m.JobsModule
					)
			},
			{
				path: 'applications',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Applications'
					}
				},
				loadChildren: () =>
					import('./modules/freelanceapplication/pages/applications/applications.module').then(
						(m) => m.ApplicationsModule
					)
			},
			{
				path: 'comments',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Comments'
					}
				},
				loadChildren: () =>
					import('./modules/freelancecomment/pages/comments/comments.module').then(
						(m) => m.CommentsModule
					)
			},
			{
				path: 'courses',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Courses'
					}
				},
				loadChildren: () =>
					import('./modules/freelancecourse/pages/courses/courses.module').then(
						(m) => m.CoursesModule
					)
			},
			{
				path: 'skills',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Skills'
					}
				},
				loadChildren: () =>
					import('./modules/freelanceskill/pages/skills/skills.module').then(
						(m) => m.SkillsModule
					)
			},
			{
				path: 'startups',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Startups'
					}
				},
				loadChildren: () =>
					import('./modules/freelancestartup/pages/startups/startups.module').then(
						(m) => m.StartupsModule
					)
			},
			{
				path: 'tests',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Tests'
					}
				},
				loadChildren: () =>
					import('./modules/freelancetest/pages/tests/tests.module').then(
						(m) => m.TestsModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import('./modules/customform/pages/customforms/customforms.module').then(
						(m) => m.CustomformsModule
					)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		AlertModule,
		ModalModule,
		CoreModule,
		BrowserModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: 'Web Art Work',
					titleSuffix: ' | Web Art Work',
					'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [AuthenticatedGuard, GuestGuard, AdminsGuard],
	bootstrap: [AppComponent]
})
export class AppModule {}
