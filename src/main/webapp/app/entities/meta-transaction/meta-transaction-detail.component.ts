import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMetaTransaction } from 'app/shared/model/meta-transaction.model';

@Component({
    selector: 'jhi-meta-transaction-detail',
    templateUrl: './meta-transaction-detail.component.html'
})
export class MetaTransactionDetailComponent implements OnInit {
    metaTransaction: IMetaTransaction;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ metaTransaction }) => {
            this.metaTransaction = metaTransaction;
        });
    }

    previousState() {
        window.history.back();
    }
}
