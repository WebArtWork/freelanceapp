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
				path: 'startup',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Startup'
					}
				},
				loadChildren: () => import('./pages/user/startup/startup.module').then(m => m.StartupModule)
			}, 
			{
				path: 'startups',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Startups'
					}
				},
				loadChildren: () => import('./pages/user/startups/startups.module').then(m => m.StartupsModule)
			}, 
			{
				path: 'interview',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Interview'
					}
				},
				loadChildren: () => import('./pages/user/interview/interview.module').then(m => m.InterviewModule)
			}, 
			{
				path: 'certificates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Certificates'
					}
				},
				loadChildren: () => import('./pages/user/certificates/certificates.module').then(m => m.CertificatesModule)
			}, 
			{
				path: 'interviews',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Interviews'
					}
				},
				loadChildren: () => import('./pages/user/interviews/interviews.module').then(m => m.InterviewsModule)
			}, 
			{
				path: 'test',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Test'
					}
				},
				loadChildren: () => import('./pages/user/test/test.module').then(m => m.TestModule)
			}, 
			{
				path: 'tests',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Tests'
					}
				},
				loadChildren: () => import('./pages/user/tests/tests.module').then(m => m.TestsModule)
			}, 
			{
				path: 'course',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Course'
					}
				},
				loadChildren: () => import('./pages/user/course/course.module').then(m => m.CourseModule)
			}, 
			{
				path: 'courses',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Courses'
					}
				},
				loadChildren: () => import('./pages/user/courses/courses.module').then(m => m.CoursesModule)
			}, 
			{
				path: 'certificate',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Certificate'
					}
				},
				loadChildren: () => import('./pages/user/certificate/certificate.module').then(m => m.CertificateModule)
			}, 
			{
				path: 'job',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Job'
					}
				},
				loadChildren: () => import('./pages/user/job/job.module').then(m => m.JobModule)
			}, 
			{
				path: 'jobs',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Jobs'
					}
				},
				loadChildren: () => import('./pages/user/jobs/jobs.module').then(m => m.JobsModule)
			}, 
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
				path: 'manage/jobs',
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
				path: 'manage/applications',
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
				path: 'manage/interviews',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Interviews'
					}
				},
				loadChildren: () =>
					import('./modules/freelanceinterview/pages/interviews/interviews.module').then(
						(m) => m.InterviewsModule
					)
			},
			{
				path: 'manage/courses',
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
				path: 'manage/certificates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Certificates'
					}
				},
				loadChildren: () =>
					import('./modules/freelancecertificate/pages/certificates/certificates.module').then(
						(m) => m.CertificatesModule
					)
			},
			{
				path: 'manage/skills',
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
				path: 'manage/startups',
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
				path: 'manage/tests',
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
		path: 'hr',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* hr */
			{
				path: 'startup',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Startup'
					}
				},
				loadChildren: () => import('./pages/hr/startup/startup.module').then(m => m.StartupModule)
			}, 
			{
				path: 'startups',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Startups'
					}
				},
				loadChildren: () => import('./pages/hr/startups/startups.module').then(m => m.StartupsModule)
			}, 
			{
				path: 'interview',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Interview'
					}
				},
				loadChildren: () => import('./pages/hr/interview/interview.module').then(m => m.InterviewModule)
			}, 
			{
				path: 'certificates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Certificates'
					}
				},
				loadChildren: () => import('./pages/hr/certificates/certificates.module').then(m => m.CertificatesModule)
			}, 
			{
				path: 'interviews',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Interviews'
					}
				},
				loadChildren: () => import('./pages/hr/interviews/interviews.module').then(m => m.InterviewsModule)
			}, 
			{
				path: 'test',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Test'
					}
				},
				loadChildren: () => import('./pages/hr/test/test.module').then(m => m.TestModule)
			}, 
			{
				path: 'tests',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Tests'
					}
				},
				loadChildren: () => import('./pages/hr/tests/tests.module').then(m => m.TestsModule)
			}, 
			{
				path: 'course',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Course'
					}
				},
				loadChildren: () => import('./pages/hr/course/course.module').then(m => m.CourseModule)
			}, 
			{
				path: 'courses',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Courses'
					}
				},
				loadChildren: () => import('./pages/hr/courses/courses.module').then(m => m.CoursesModule)
			}, 
			{
				path: 'certificate',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Certificate'
					}
				},
				loadChildren: () => import('./pages/hr/certificate/certificate.module').then(m => m.CertificateModule)
			}, 
			{
				path: 'job',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Job'
					}
				},
				loadChildren: () => import('./pages/hr/job/job.module').then(m => m.JobModule)
			}, 
			{
				path: 'jobs',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Jobs'
					}
				},
				loadChildren: () => import('./pages/hr/jobs/jobs.module').then(m => m.JobsModule)
			}, 
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/hr/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			},
			{
				path: 'manage/jobs',
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
				path: 'manage/applications',
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
				path: 'manage/interviews',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Interviews'
					}
				},
				loadChildren: () =>
					import('./modules/freelanceinterview/pages/interviews/interviews.module').then(
						(m) => m.InterviewsModule
					)
			},
			{
				path: 'manage/courses',
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
				path: 'manage/certificates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Certificates'
					}
				},
				loadChildren: () =>
					import('./modules/freelancecertificate/pages/certificates/certificates.module').then(
						(m) => m.CertificatesModule
					)
			},
			{
				path: 'manage/skills',
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
				path: 'manage/startups',
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
				path: 'manage/tests',
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
