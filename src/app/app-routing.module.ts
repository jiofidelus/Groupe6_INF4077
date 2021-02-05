import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ContactComponent } from './components/contact/contact.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { ExpertComponent } from './components/expert/expert.component';
import { HomeComponent } from './components/home/home.component';
import { MoreAboutComponent } from './components/more-about/more-about.component';
import { SignalComponent } from './components/signal/signal.component';
import { ConnexionComponent } from './components/connexion/connexion.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"about", component:MoreAboutComponent},
  {path:"contact", component:ContactComponent},
  {path:"signal", component:SignalComponent},
  {path:"admin", component:AdminComponent, canActivate: [ AuthGuard ]},
  {path:"doctor", component:DoctorComponent, canActivate: [ AuthGuard ]},
  {path:"expert", component:ExpertComponent, canActivate: [ AuthGuard ]},
  {path:"connexion", component:ConnexionComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: ConnexionComponent } //url not found route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
