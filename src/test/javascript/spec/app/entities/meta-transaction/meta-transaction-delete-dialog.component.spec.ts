/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ParralalTestModule } from '../../../test.module';
import { MetaTransactionDeleteDialogComponent } from 'app/entities/meta-transaction/meta-transaction-delete-dialog.component';
import { MetaTransactionService } from 'app/entities/meta-transaction/meta-transaction.service';

describe('Component Tests', () => {
    describe('MetaTransaction Management Delete Component', () => {
        let comp: MetaTransactionDeleteDialogComponent;
        let fixture: ComponentFixture<MetaTransactionDeleteDialogComponent>;
        let service: MetaTransactionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParralalTestModule],
                declarations: [MetaTransactionDeleteDialogComponent]
            })
                .overrideTemplate(MetaTransactionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MetaTransactionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetaTransactionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
