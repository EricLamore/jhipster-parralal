/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ParralalTestModule } from '../../../test.module';
import { MetaTransactionUpdateComponent } from 'app/entities/meta-transaction/meta-transaction-update.component';
import { MetaTransactionService } from 'app/entities/meta-transaction/meta-transaction.service';
import { MetaTransaction } from 'app/shared/model/meta-transaction.model';

describe('Component Tests', () => {
    describe('MetaTransaction Management Update Component', () => {
        let comp: MetaTransactionUpdateComponent;
        let fixture: ComponentFixture<MetaTransactionUpdateComponent>;
        let service: MetaTransactionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParralalTestModule],
                declarations: [MetaTransactionUpdateComponent]
            })
                .overrideTemplate(MetaTransactionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MetaTransactionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetaTransactionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MetaTransaction('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.metaTransaction = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MetaTransaction();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.metaTransaction = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
