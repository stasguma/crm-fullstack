import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import {Observable} from 'rxjs';
import {AnalyticsService} from '../shared/services/analytics.service';
import {OverviewPage} from '../shared/interfaces';
import {
    MaterialInstance,
    MaterialService
} from '../shared/classes/material.service';

@Component({
    selector: 'app-overview-page',
    templateUrl: './overview-page.component.html',
    styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('tapTarget', {static: false}) tapTargetRef: ElementRef;

    tapTarget: MaterialInstance;
    data$: Observable<OverviewPage>;

    yesterday = new Date();

    constructor(private analyticsService: AnalyticsService) {}

    ngOnInit() {
        this.data$ = this.analyticsService.getOverview();

        this.yesterday.setDate(this.yesterday.getDate() - 1);
    }

    ngAfterViewInit() {
        this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
    }

    ngOnDestroy() {
        this.tapTarget.destroy();
    }

    openInfo() {
        this.tapTarget.open();
    }
}
