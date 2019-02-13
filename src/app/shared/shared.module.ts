import { NgModule } from '@angular/core';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
//  routes
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// pipes
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],

    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent
    ]

})
export class SharedModule { }
