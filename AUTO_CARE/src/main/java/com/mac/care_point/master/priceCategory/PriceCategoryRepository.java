/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.priceCategory;

import com.mac.care_point.master.priceCategory.model.PriceCategory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Supervision
 */
public interface PriceCategoryRepository  extends JpaRepository<PriceCategory, Integer>  {

    public List<PriceCategory> findByName(String name);
    
    
}
