package com.universign.universigncs.parralal.web.rest;
import com.universign.universigncs.parralal.domain.MetaTransaction;
import com.universign.universigncs.parralal.repository.MetaTransactionRepository;
import com.universign.universigncs.parralal.web.rest.errors.BadRequestAlertException;
import com.universign.universigncs.parralal.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MetaTransaction.
 */
@RestController
@RequestMapping("/api")
public class MetaTransactionResource {

    private final Logger log = LoggerFactory.getLogger(MetaTransactionResource.class);

    private static final String ENTITY_NAME = "metaTransaction";

    private final MetaTransactionRepository metaTransactionRepository;

    public MetaTransactionResource(MetaTransactionRepository metaTransactionRepository) {
        this.metaTransactionRepository = metaTransactionRepository;
    }

    /**
     * POST  /meta-transactions : Create a new metaTransaction.
     *
     * @param metaTransaction the metaTransaction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new metaTransaction, or with status 400 (Bad Request) if the metaTransaction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meta-transactions")
    public ResponseEntity<MetaTransaction> createMetaTransaction(@RequestBody MetaTransaction metaTransaction) throws URISyntaxException {
        log.debug("REST request to save MetaTransaction : {}", metaTransaction);
        if (metaTransaction.getId() != null) {
            throw new BadRequestAlertException("A new metaTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MetaTransaction result = metaTransactionRepository.save(metaTransaction);
        return ResponseEntity.created(new URI("/api/meta-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meta-transactions : Updates an existing metaTransaction.
     *
     * @param metaTransaction the metaTransaction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated metaTransaction,
     * or with status 400 (Bad Request) if the metaTransaction is not valid,
     * or with status 500 (Internal Server Error) if the metaTransaction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meta-transactions")
    public ResponseEntity<MetaTransaction> updateMetaTransaction(@RequestBody MetaTransaction metaTransaction) throws URISyntaxException {
        log.debug("REST request to update MetaTransaction : {}", metaTransaction);
        if (metaTransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MetaTransaction result = metaTransactionRepository.save(metaTransaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, metaTransaction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meta-transactions : get all the metaTransactions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of metaTransactions in body
     */
    @GetMapping("/meta-transactions")
    public List<MetaTransaction> getAllMetaTransactions() {
        log.debug("REST request to get all MetaTransactions");
        return metaTransactionRepository.findAll();
    }

    /**
     * GET  /meta-transactions/:id : get the "id" metaTransaction.
     *
     * @param id the id of the metaTransaction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the metaTransaction, or with status 404 (Not Found)
     */
    @GetMapping("/meta-transactions/{id}")
    public ResponseEntity<MetaTransaction> getMetaTransaction(@PathVariable String id) {
        log.debug("REST request to get MetaTransaction : {}", id);
        Optional<MetaTransaction> metaTransaction = metaTransactionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(metaTransaction);
    }

    /**
     * DELETE  /meta-transactions/:id : delete the "id" metaTransaction.
     *
     * @param id the id of the metaTransaction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meta-transactions/{id}")
    public ResponseEntity<Void> deleteMetaTransaction(@PathVariable String id) {
        log.debug("REST request to delete MetaTransaction : {}", id);
        metaTransactionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
