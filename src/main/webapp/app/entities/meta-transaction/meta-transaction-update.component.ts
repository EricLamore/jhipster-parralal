import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { IMetaTransaction } from 'app/shared/model/meta-transaction.model';
import { MetaTransactionService } from './meta-transaction.service';

@Component({
    selector: 'jhi-meta-transaction-update',
    templateUrl: './meta-transaction-update.component.html'
})
export class MetaTransactionUpdateComponent implements OnInit {
    metaTransaction: IMetaTransaction;
    isSaving: boolean;
    createdDateDp: any;
    lastModifiedDateDp: any;

    constructor(protected metaTransactionService: MetaTransactionService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ metaTransaction }) => {
            this.metaTransaction = metaTransaction;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.metaTransaction.id !== undefined) {
            this.subscribeToSaveResponse(this.metaTransactionService.update(this.metaTransaction));
        } else {
            this.subscribeToSaveResponse(this.metaTransactionService.create(this.metaTransaction));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetaTransaction>>) {
        result.subscribe((res: HttpResponse<IMetaTransaction>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
