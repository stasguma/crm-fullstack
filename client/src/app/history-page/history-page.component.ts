import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import {
    MaterialInstance,
    MaterialService
} from '../shared/classes/material.service';
import {OrdersService} from '../shared/services/orders.service';
import {Subscription} from 'rxjs';
import {Order, Filter} from '../shared/interfaces';

const STEP = 2;

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('tooltip', {static: false}) tooltipRef: ElementRef;
    tooltip: MaterialInstance;
    oSub: Subscription;
    isFilterVisible = false;
    orders: Order[] = [];
    filter: Filter = {};

    offset = 0;
    limit = STEP;

    loading = false;
    reloading = false;
    noMoreOrders = false;

    constructor(private ordersService: OrdersService) {}

    ngOnInit() {
        this.reloading = true;
        this.fetch();
    }

    ngOnDestroy() {
        this.tooltip.destroy();
        this.oSub.unsubscribe();
    }

    ngAfterViewInit() {
        this.tooltip = MaterialService.initTooltip(this.tooltipRef);
    }

    private fetch() {
        const params = Object.assign({}, this.filter, {
            offset: this.offset,
            limit: this.limit
        });

        this.oSub = this.ordersService.fetch(params).subscribe(orders => {
            this.orders = this.orders.concat(orders);
            this.noMoreOrders = orders.length < STEP;
            this.loading = false;
            this.reloading = false;
        });
    }

    loadMore() {
        this.offset += STEP;
        this.loading = true;
        this.fetch();
    }

    applyFilter(filter: Filter) {
        this.orders = [];
        this.offset = 0;
        this.filter = filter;
        this.reloading = true;
        this.fetch();
    }

    isFiltered(): boolean {
        return Object.keys(this.filter).length !== 0;
    }
}
