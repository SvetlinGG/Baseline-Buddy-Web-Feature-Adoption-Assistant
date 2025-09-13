import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: '', redirectTo: 'baseline', pathMatch: 'full'},
    {path: 'baseline', component: AppComponent}
];
