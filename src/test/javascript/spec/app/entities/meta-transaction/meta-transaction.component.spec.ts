/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ParralalTestModule } from '../../../test.module';
import { MetaTransactionComponent } from 'app/entities/meta-transaction/meta-transaction.component';
import { MetaTransactionService } from 'app/entities/meta-transaction/meta-transaction.service';
import { MetaTransaction } from 'app/shared/model/meta-transaction.model';

describe('Component Tests', () => {
    describe('MetaTransaction Management Component', () => {
        let comp: MetaTransactionComponent;
        let fixture: ComponentFixture<MetaTransactionComponent>;
        let service: MetaTransactionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParralalTestModule],
                declarations: [MetaTransactionComponent],
                providers: []
            })
                .overrideTemplate(MetaTransactionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MetaTransactionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetaTransactionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MetaTransaction('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.metaTransactions[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
