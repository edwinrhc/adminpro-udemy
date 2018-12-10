import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule} from '@angular/forms';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
// Routes
import { PAGES_ROUTES } from './pages.routes';



// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent
    ],
    exports : [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent

    ],

    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule

    ]


})
export class PagesModule { }
