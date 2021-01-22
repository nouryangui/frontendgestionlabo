/**
 * Created by wangdi on 26/5/17.
 */
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';

import { RootComponent } from './dashboard/root/root.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { ToolListComponent } from './tool-list/tool-list.component';
import { ToolFormComponent } from './tool-form/tool-form.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { PubComponent } from './member-list/pub/pub.component';
import { EventComponent } from './member-list/event/event.component';
import { ToolComponent } from './member-list/tool/tool.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddimageComponent } from './addimage/addimage.component';

const routes: Routes = [
 
  {
    path: 'dashboard', component: RootComponent, children: [
      { path: '', component: HomeComponent },
     {
        path: 'members',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: MemberListComponent,
          },
          {
            path: 'create',
            pathMatch: 'full',
            component: MemberFormComponent,
          },
          {
            path: ':id/edit',
            pathMatch: 'full',
            component: MemberFormComponent,
          },
          {
            path: 'publications',
            pathMatch: 'full',
            component: PubComponent,
          },
          {
            path: 'tools',
            pathMatch: 'full',
            component:ToolComponent ,
          },
          {
            path: 'events',
            pathMatch: 'full',
            component: EventComponent,
          },
         
          {
            path: '**',
            redirectTo: '',
          }
        ]
      },
      {
        path: 'publications',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: PublicationListComponent
          },
          {
            path: 'create',
            pathMatch: 'full',
            component: PublicationFormComponent,
          },
          {
            path: ':id/edit',
            pathMatch: 'full',
            component: PublicationFormComponent,
          },
         
          {
            path: '**',
            redirectTo: '',
          }
        ]
      },
      {
        path: 'tools',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ToolListComponent
          },
          {
            path: 'create',
            pathMatch: 'full',
            component: ToolFormComponent,
          },
          {
            path: ':id/edit',
            pathMatch: 'full',
            component: ToolFormComponent,
          },
         
          {
            path: '**',
            redirectTo: '',
          }
        ]
      },
      {
        path: 'events',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: EventListComponent
          },
          {
            path: 'create',
            pathMatch: 'full',
            component: EventFormComponent,
          },
          {
            path: ':id/edit',
            pathMatch: 'full',
            component: EventFormComponent,
          },
         
          {
            path: '**',
            redirectTo: '',
          }
        ]
      },
    ],
  },
    
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },
  {path:'image',component:AddimageComponent},
  { path: '', component: LoginComponent },


  

];

export const routing = RouterModule.forRoot(routes);

