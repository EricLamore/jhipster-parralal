package com.universign.universigncs.parralal.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.universign.universigncs.parralal.domain.enumeration.TansactonsStatus;

/**
 * A MetaTransaction.
 */
@Document(collection = "meta_transaction")
public class MetaTransaction implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("status")
    private TansactonsStatus status;

    @Field("created_date")
    private LocalDate createdDate;

    @Field("last_modified_date")
    private LocalDate lastModifiedDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public TansactonsStatus getStatus() {
        return status;
    }

    public MetaTransaction status(TansactonsStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(TansactonsStatus status) {
        this.status = status;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public MetaTransaction createdDate(LocalDate createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getLastModifiedDate() {
        return lastModifiedDate;
    }

    public MetaTransaction lastModifiedDate(LocalDate lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(LocalDate lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MetaTransaction metaTransaction = (MetaTransaction) o;
        if (metaTransaction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), metaTransaction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MetaTransaction{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            "}";
    }
}
