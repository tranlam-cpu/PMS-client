import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(
        public layoutService: LayoutService
    ) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] , routerLinkActiveOptions: { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } }
                ]
            },
            {
                label: 'UI Chức năng',
                items: [
                    { label: 'Danh mục', icon: 'pi pi-fw pi-check-square', routerLink: ['/dashboard/ct'] },
                    { label: 'Sản phẩm', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/pd']   } ,
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/ss'] },
                ]
            },
           
        ];
    }
}
