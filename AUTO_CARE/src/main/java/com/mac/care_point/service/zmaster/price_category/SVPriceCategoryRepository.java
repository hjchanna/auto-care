/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.price_category;

import com.mac.care_point.service.zmaster.price_category.model.MPriceCategory;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kalum
 */
public interface SVPriceCategoryRepository extends JpaRepository<MPriceCategory, Integer> {
    
}
