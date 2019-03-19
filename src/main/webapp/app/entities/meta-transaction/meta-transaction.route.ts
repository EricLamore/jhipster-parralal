import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MetaTransaction } from 'app/shared/model/meta-transaction.model';
import { MetaTransactionService } from './meta-transaction.service';
import { MetaTransactionComponent } from './meta-transaction.component';
import { MetaTransactionDetailComponent } from './meta-transaction-detail.component';
import { MetaTransactionUpdateComponent } from './meta-transaction-update.component';
import { MetaTransactionDeletePopupComponent } from './meta-transaction-delete-dialog.component';
import { IMetaTransaction } from 'app/shared/model/meta-transaction.model';

@Injectable({ providedIn: 'root' })
export class MetaTransactionResolve implements Resolve<IMetaTransaction> {
    constructor(private service: MetaTransactionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMetaTransaction> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MetaTransaction>) => response.ok),
                map((metaTransaction: HttpResponse<MetaTransaction>) => metaTransaction.body)
            );
        }
        return of(new MetaTransaction());
    }
}

export const metaTransactionRoute: Routes = [
    {
        path: '',
        component: MetaTransactionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'parralalApp.metaTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MetaTransactionDetailComponent,
        resolve: {
            metaTransaction: MetaTransactionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'parralalApp.metaTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MetaTransactionUpdateComponent,
        resolve: {
            metaTransaction: MetaTransactionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'parralalApp.metaTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MetaTransactionUpdateComponent,
        resolve: {
            metaTransaction: MetaTransactionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'parralalApp.metaTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const metaTransactionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MetaTransactionDeletePopupComponent,
        resolve: {
            metaTransaction: MetaTransactionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'parralalApp.metaTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
