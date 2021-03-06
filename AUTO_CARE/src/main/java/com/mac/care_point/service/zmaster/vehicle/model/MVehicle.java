/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.vehicle.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Supervision
 */
@Entity(name = "com.mac.care_point.service.zmaster.vehicle.model")
@Table(name = "m_vehicle")
public class MVehicle implements Serializable {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Size(max = 25)
    @Column(name = "vehicle_no")
    private String vehicleNo;

    @Column(name = "year")
    private Integer year;

    @Size(max = 50)
    @Column(name = "engine_no")
    private String engineNo;
    
    @Size(max = 50)
    @Column(name = "chasis_no")
    private String chasisNo;

    @Column(name = "insurance_expiry_date")
    @Temporal(TemporalType.DATE)
    private Date insuranceExpiryDate;

    @Column(name = "revenue_expiry_date")
    @Temporal(TemporalType.DATE)
    private Date revenueExpiryDate;

    @Basic(optional = false)
    @NotNull
    @Column(name = "last_milage")
    private int lastMilage;

    @Column(name = "next_milage")
    private Integer nextMilage;

    @Size(max = 25)
    @Column(name = "colour")
    private String colour;

    @NotNull
    @Column(name = "client")
    private Integer client;

    @Column(name = "vehicle_type")
    private Integer vehicleType;
    
    @NotNull
    @Column(name = "price_category")
    private Integer priceCategory;

    @Column(name = "type")
    private String type;
   
    @Column(name = "brand")
    private String brand;
    
    @Column(name = "model")
    private String model;
    
    @Column(name = "fuel_type")
    private String fuelType;
    
    @Column(name = "is_new")
    private boolean isNew;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    public MVehicle() {
    }

    public MVehicle(Integer indexNo, String vehicleNo, Integer year, String engineNo, String chasisNo, Date insuranceExpiryDate, Date revenueExpiryDate, int lastMilage, Integer nextMilage, String colour, Integer client, Integer vehicleType, Integer priceCategory, String type, String brand, String model, String fuelType, boolean isNew, Date date) {
        this.indexNo = indexNo;
        this.vehicleNo = vehicleNo;
        this.year = year;
        this.engineNo = engineNo;
        this.chasisNo = chasisNo;
        this.insuranceExpiryDate = insuranceExpiryDate;
        this.revenueExpiryDate = revenueExpiryDate;
        this.lastMilage = lastMilage;
        this.nextMilage = nextMilage;
        this.colour = colour;
        this.client = client;
        this.vehicleType = vehicleType;
        this.priceCategory = priceCategory;
        this.type = type;
        this.brand = brand;
        this.model = model;
        this.fuelType = fuelType;
        this.isNew = isNew;
        this.date = date;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getEngineNo() {
        return engineNo;
    }

    public void setEngineNo(String engineNo) {
        this.engineNo = engineNo;
    }

    public String getChasisNo() {
        return chasisNo;
    }

    public void setChasisNo(String chasisNo) {
        this.chasisNo = chasisNo;
    }

    public Date getInsuranceExpiryDate() {
        return insuranceExpiryDate;
    }

    public void setInsuranceExpiryDate(Date insuranceExpiryDate) {
        this.insuranceExpiryDate = insuranceExpiryDate;
    }

    public Date getRevenueExpiryDate() {
        return revenueExpiryDate;
    }

    public void setRevenueExpiryDate(Date revenueExpiryDate) {
        this.revenueExpiryDate = revenueExpiryDate;
    }

    public int getLastMilage() {
        return lastMilage;
    }

    public void setLastMilage(int lastMilage) {
        this.lastMilage = lastMilage;
    }

    public Integer getNextMilage() {
        return nextMilage;
    }

    public void setNextMilage(Integer nextMilage) {
        this.nextMilage = nextMilage;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

    public Integer getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(Integer vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Integer getPriceCategory() {
        return priceCategory;
    }

    public void setPriceCategory(Integer priceCategory) {
        this.priceCategory = priceCategory;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public boolean isIsNew() {
        return isNew;
    }

    public void setIsNew(boolean isNew) {
        this.isNew = isNew;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}