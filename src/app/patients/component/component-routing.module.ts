import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentComponent } from './component.component';

const routes: Routes = [
	{
		path : '',
		component : ComponentComponent
	},
	{
		path: 'localite/:id',
		component: ComponentComponent
	},
	{
		path: 'localite',
		component: ComponentComponent
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
