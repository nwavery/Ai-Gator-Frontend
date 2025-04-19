import { Routes } from '@angular/router';
import { ToolDetailComponent } from './components/tool-detail/tool-detail.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SubmitToolComponent } from './pages/submit-tool/submit-tool.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'tool/:id',
    component: ToolDetailComponent,
    data: { renderMode: 'client' }
  },
  { path: 'submit', component: SubmitToolComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
