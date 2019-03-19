import { Moment } from 'moment';

export const enum TansactonsStatus {
    NONE = 'NONE',
    CREATE = 'CREATE',
    LAUNCH = 'LAUNCH',
    FAILED = 'FAILED',
    FINISH = 'FINISH'
}

export interface IMetaTransaction {
    id?: string;
    status?: TansactonsStatus;
    createdDate?: Moment;
    lastModifiedDate?: Moment;
}

export class MetaTransaction implements IMetaTransaction {
    constructor(public id?: string, public status?: TansactonsStatus, public createdDate?: Moment, public lastModifiedDate?: Moment) {}
}
