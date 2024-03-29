import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AppLayoutModule } from "./layout/app.layout.module";
import { RouterModule, Routes } from "@angular/router";
import { AppLayoutComponent } from "./layout/app.layout.component";
import { ButtonModule } from 'primeng/button';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { EffectsModule } from "@ngrx/effects";
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { CreateCommonComponent } from './create-common/create-common.component';
import { CreateProductComponent } from './create-common/create-product/create-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
const routes: Routes=[
    {
        path: '', children:[
            {path: '',redirectTo: 'dashboard',pathMatch: 'full'},
            {
                path:'dashboard', component: AppLayoutComponent,
                children:[
                    {path: 'pd', children:[
                        {path: '', component: ProductComponent},
                        {path: 'create', component: CreateCommonComponent},
                        {path: 'edit/:id', component: EditProductComponent},
                    ]},
                    {path: 'ct', component: CategoryComponent}
                ]
            },
        ]
    }
]


@NgModule({
    declarations: [DashboardComponent, ProductComponent, CategoryComponent, CreateCommonComponent, CreateProductComponent, EditProductComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature(),
        AppLayoutModule,
        TableModule,
        TagModule,
        ButtonModule,
        DialogModule,
        ToastModule,
        ConfirmDialogModule,
        InputTextModule,
        InputTextareaModule,
        FileUploadModule,
        DropdownModule
    ],
})
export class DashboardModule{}