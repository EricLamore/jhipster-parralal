import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMetaTransaction } from 'app/shared/model/meta-transaction.model';

type EntityResponseType = HttpResponse<IMetaTransaction>;
type EntityArrayResponseType = HttpResponse<IMetaTransaction[]>;

@Injectable({ providedIn: 'root' })
export class MetaTransactionService {
    public resourceUrl = SERVER_API_URL + 'api/meta-transactions';

    constructor(protected http: HttpClient) {}

    create(metaTransaction: IMetaTransaction): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(metaTransaction);
        return this.http
            .post<IMetaTransaction>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(metaTransaction: IMetaTransaction): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(metaTransaction);
        return this.http
            .put<IMetaTransaction>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IMetaTransaction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMetaTransaction[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(metaTransaction: IMetaTransaction): IMetaTransaction {
        const copy: IMetaTransaction = Object.assign({}, metaTransaction, {
            createdDate:
                metaTransaction.createdDate != null && metaTransaction.createdDate.isValid()
                    ? metaTransaction.createdDate.format(DATE_FORMAT)
                    : null,
            lastModifiedDate:
                metaTransaction.lastModifiedDate != null && metaTransaction.lastModifiedDate.isValid()
                    ? metaTransaction.lastModifiedDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
            res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((metaTransaction: IMetaTransaction) => {
                metaTransaction.createdDate = metaTransaction.createdDate != null ? moment(metaTransaction.createdDate) : null;
                metaTransaction.lastModifiedDate =
                    metaTransaction.lastModifiedDate != null ? moment(metaTransaction.lastModifiedDate) : null;
            });
        }
        return res;
    }
}
