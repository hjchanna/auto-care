/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.stock.transfer.model;

import com.mac.care_point.service.grn.model.*;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author L T430
 */
@Entity(name="com.mac.care_point.service.stock.transfer.model.MStore")
@Table(name = "m_store")
public class MStore implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "number")
    private int number;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "branch")
    private int branch;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Size(max = 25)
    @Column(name = "name")
    private String name;


    @Column(name = "type")
    private String type;

    public MStore() {
    }

    public MStore(int number, int branch, Integer indexNo, String name, String type) {
        this.number = number;
        this.branch = branch;
        this.indexNo = indexNo;
        this.name = name;
        this.type = type;
    }

  

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getBranch() {
        return branch;
    }

    public void setBranch(int branch) {
        this.branch = branch;
    }

}
