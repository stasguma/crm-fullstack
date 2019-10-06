import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {
    MaterialService,
    MaterialInstance
} from '../shared/classes/material.service';
import {OrderLocalService} from './order.service';
import {OrderPosition, Order} from '../shared/interfaces';
import {OrdersService} from '../shared/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.css'],
    providers: [OrderLocalService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('modal', {static: false}) modalRef: ElementRef;

    modal: MaterialInstance;
    isRoot: boolean;
    pending = false;
    oSub: Subscription;

    constructor(
        private router: Router,
        private orderLocalService: OrderLocalService,
        private ordersService: OrdersService
    ) {}

    ngOnInit() {
        this.isRoot = this.router.url === '/order';

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.isRoot = this.router.url === '/order';
            }
        });
    }

    ngOnDestroy() {
        this.modal.destroy();

        if (this.oSub) {
            this.oSub.unsubscribe()
        }
    }

    ngAfterViewInit() {
        this.modal = MaterialService.initModal(this.modalRef);
    }

    removePosition(orderPosition: OrderPosition) {
        this.orderLocalService.remove(orderPosition);
    }

    open() {
        this.modal.open();
    }

    cancel() {
        this.modal.close();
    }

    submit() {
        this.pending = true;

        const order: Order = {
            list: this.orderLocalService.list.map(item => {
                delete item._id;
                return item;
            })
        };

        this.oSub = this.ordersService.create(order).subscribe(
            newOrder => {
                MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`);
                this.orderLocalService.clear();
            },
            error => {
                MaterialService.toast(error.error.message);
            },
            () => {
                this.modal.close();
                this.pending = false;
            }
        );
    }
}
