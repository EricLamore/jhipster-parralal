import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMetaTransaction } from 'app/shared/model/meta-transaction.model';
import { AccountService } from 'app/core';
import { MetaTransactionService } from './meta-transaction.service';

@Component({
    selector: 'jhi-meta-transaction',
    templateUrl: './meta-transaction.component.html'
})
export class MetaTransactionComponent implements OnInit, OnDestroy {
    metaTransactions: IMetaTransaction[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected metaTransactionService: MetaTransactionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.metaTransactionService
            .query()
            .pipe(
                filter((res: HttpResponse<IMetaTransaction[]>) => res.ok),
                map((res: HttpResponse<IMetaTransaction[]>) => res.body)
            )
            .subscribe(
                (res: IMetaTransaction[]) => {
                    this.metaTransactions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMetaTransactions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMetaTransaction) {
        return item.id;
    }

    registerChangeInMetaTransactions() {
        this.eventSubscriber = this.eventManager.subscribe('metaTransactionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
