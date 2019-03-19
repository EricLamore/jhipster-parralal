package com.universign.universigncs.parralal.web.rest;

import com.universign.universigncs.parralal.ParralalApp;

import com.universign.universigncs.parralal.domain.MetaTransaction;
import com.universign.universigncs.parralal.repository.MetaTransactionRepository;
import com.universign.universigncs.parralal.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.universign.universigncs.parralal.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.universign.universigncs.parralal.domain.enumeration.TansactonsStatus;
/**
 * Test class for the MetaTransactionResource REST controller.
 *
 * @see MetaTransactionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ParralalApp.class)
public class MetaTransactionResourceIntTest {

    private static final TansactonsStatus DEFAULT_STATUS = TansactonsStatus.NONE;
    private static final TansactonsStatus UPDATED_STATUS = TansactonsStatus.CREATE;

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LAST_MODIFIED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_MODIFIED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private MetaTransactionRepository metaTransactionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restMetaTransactionMockMvc;

    private MetaTransaction metaTransaction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MetaTransactionResource metaTransactionResource = new MetaTransactionResource(metaTransactionRepository);
        this.restMetaTransactionMockMvc = MockMvcBuilders.standaloneSetup(metaTransactionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaTransaction createEntity() {
        MetaTransaction metaTransaction = new MetaTransaction()
            .status(DEFAULT_STATUS)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return metaTransaction;
    }

    @Before
    public void initTest() {
        metaTransactionRepository.deleteAll();
        metaTransaction = createEntity();
    }

    @Test
    public void createMetaTransaction() throws Exception {
        int databaseSizeBeforeCreate = metaTransactionRepository.findAll().size();

        // Create the MetaTransaction
        restMetaTransactionMockMvc.perform(post("/api/meta-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metaTransaction)))
            .andExpect(status().isCreated());

        // Validate the MetaTransaction in the database
        List<MetaTransaction> metaTransactionList = metaTransactionRepository.findAll();
        assertThat(metaTransactionList).hasSize(databaseSizeBeforeCreate + 1);
        MetaTransaction testMetaTransaction = metaTransactionList.get(metaTransactionList.size() - 1);
        assertThat(testMetaTransaction.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testMetaTransaction.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testMetaTransaction.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    public void createMetaTransactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metaTransactionRepository.findAll().size();

        // Create the MetaTransaction with an existing ID
        metaTransaction.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetaTransactionMockMvc.perform(post("/api/meta-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metaTransaction)))
            .andExpect(status().isBadRequest());

        // Validate the MetaTransaction in the database
        List<MetaTransaction> metaTransactionList = metaTransactionRepository.findAll();
        assertThat(metaTransactionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllMetaTransactions() throws Exception {
        // Initialize the database
        metaTransactionRepository.save(metaTransaction);

        // Get all the metaTransactionList
        restMetaTransactionMockMvc.perform(get("/api/meta-transactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metaTransaction.getId())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    public void getMetaTransaction() throws Exception {
        // Initialize the database
        metaTransactionRepository.save(metaTransaction);

        // Get the metaTransaction
        restMetaTransactionMockMvc.perform(get("/api/meta-transactions/{id}", metaTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(metaTransaction.getId()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    public void getNonExistingMetaTransaction() throws Exception {
        // Get the metaTransaction
        restMetaTransactionMockMvc.perform(get("/api/meta-transactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMetaTransaction() throws Exception {
        // Initialize the database
        metaTransactionRepository.save(metaTransaction);

        int databaseSizeBeforeUpdate = metaTransactionRepository.findAll().size();

        // Update the metaTransaction
        MetaTransaction updatedMetaTransaction = metaTransactionRepository.findById(metaTransaction.getId()).get();
        updatedMetaTransaction
            .status(UPDATED_STATUS)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restMetaTransactionMockMvc.perform(put("/api/meta-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetaTransaction)))
            .andExpect(status().isOk());

        // Validate the MetaTransaction in the database
        List<MetaTransaction> metaTransactionList = metaTransactionRepository.findAll();
        assertThat(metaTransactionList).hasSize(databaseSizeBeforeUpdate);
        MetaTransaction testMetaTransaction = metaTransactionList.get(metaTransactionList.size() - 1);
        assertThat(testMetaTransaction.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testMetaTransaction.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testMetaTransaction.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    public void updateNonExistingMetaTransaction() throws Exception {
        int databaseSizeBeforeUpdate = metaTransactionRepository.findAll().size();

        // Create the MetaTransaction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetaTransactionMockMvc.perform(put("/api/meta-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metaTransaction)))
            .andExpect(status().isBadRequest());

        // Validate the MetaTransaction in the database
        List<MetaTransaction> metaTransactionList = metaTransactionRepository.findAll();
        assertThat(metaTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMetaTransaction() throws Exception {
        // Initialize the database
        metaTransactionRepository.save(metaTransaction);

        int databaseSizeBeforeDelete = metaTransactionRepository.findAll().size();

        // Delete the metaTransaction
        restMetaTransactionMockMvc.perform(delete("/api/meta-transactions/{id}", metaTransaction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MetaTransaction> metaTransactionList = metaTransactionRepository.findAll();
        assertThat(metaTransactionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MetaTransaction.class);
        MetaTransaction metaTransaction1 = new MetaTransaction();
        metaTransaction1.setId("id1");
        MetaTransaction metaTransaction2 = new MetaTransaction();
        metaTransaction2.setId(metaTransaction1.getId());
        assertThat(metaTransaction1).isEqualTo(metaTransaction2);
        metaTransaction2.setId("id2");
        assertThat(metaTransaction1).isNotEqualTo(metaTransaction2);
        metaTransaction1.setId(null);
        assertThat(metaTransaction1).isNotEqualTo(metaTransaction2);
    }
}
