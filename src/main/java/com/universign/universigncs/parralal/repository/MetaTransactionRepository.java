package com.universign.universigncs.parralal.repository;

import com.universign.universigncs.parralal.domain.MetaTransaction;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the MetaTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetaTransactionRepository extends MongoRepository<MetaTransaction, String> {

}
