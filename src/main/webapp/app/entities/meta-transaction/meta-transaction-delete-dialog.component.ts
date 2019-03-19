import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetaTransaction } from 'app/shared/model/meta-transaction.model';
import { MetaTransactionService } from './meta-transaction.service';

@Component({
    selector: 'jhi-meta-transaction-delete-dialog',
    templateUrl: './meta-transaction-delete-dialog.component.html'
})
export class MetaTransactionDeleteDialogComponent {
    metaTransaction: IMetaTransaction;

    constructor(
        protected metaTransactionService: MetaTransactionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.metaTransactionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'metaTransactionListModification',
                content: 'Deleted an metaTransaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meta-transaction-delete-popup',
    template: ''
})
export class MetaTransactionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ metaTransaction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MetaTransactionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.metaTransaction = metaTransaction;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/meta-transaction', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/meta-transaction', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
