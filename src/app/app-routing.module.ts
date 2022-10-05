import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LaunchDetailComponent } from './components/launch-detail/launch-detail.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: 'launchDetail/:flight_number', component: LaunchDetailComponent},
  { path: '', redirectTo: 'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
