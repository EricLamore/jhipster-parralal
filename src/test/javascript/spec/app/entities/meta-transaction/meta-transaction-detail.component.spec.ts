/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParralalTestModule } from '../../../test.module';
import { MetaTransactionDetailComponent } from 'app/entities/meta-transaction/meta-transaction-detail.component';
import { MetaTransaction } from 'app/shared/model/meta-transaction.model';

describe('Component Tests', () => {
    describe('MetaTransaction Management Detail Component', () => {
        let comp: MetaTransactionDetailComponent;
        let fixture: ComponentFixture<MetaTransactionDetailComponent>;
        const route = ({ data: of({ metaTransaction: new MetaTransaction('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParralalTestModule],
                declarations: [MetaTransactionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MetaTransactionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MetaTransactionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.metaTransaction).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
