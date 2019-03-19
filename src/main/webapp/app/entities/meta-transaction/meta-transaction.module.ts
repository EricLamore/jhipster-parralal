import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ParralalSharedModule } from 'app/shared';
import {
    MetaTransactionComponent,
    MetaTransactionDetailComponent,
    MetaTransactionUpdateComponent,
    MetaTransactionDeletePopupComponent,
    MetaTransactionDeleteDialogComponent,
    metaTransactionRoute,
    metaTransactionPopupRoute
} from './';

const ENTITY_STATES = [...metaTransactionRoute, ...metaTransactionPopupRoute];

@NgModule({
    imports: [ParralalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MetaTransactionComponent,
        MetaTransactionDetailComponent,
        MetaTransactionUpdateComponent,
        MetaTransactionDeleteDialogComponent,
        MetaTransactionDeletePopupComponent
    ],
    entryComponents: [
        MetaTransactionComponent,
        MetaTransactionUpdateComponent,
        MetaTransactionDeleteDialogComponent,
        MetaTransactionDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParralalMetaTransactionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
