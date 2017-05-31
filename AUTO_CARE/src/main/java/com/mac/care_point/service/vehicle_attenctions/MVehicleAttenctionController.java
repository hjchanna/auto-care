/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.vehicle_attenctions;

import com.mac.care_point.service.vehicle_attenctions.model.MVehicleAttenctions;
import com.mac.care_point.service.vehicle_attenctions.model.MVehicleAttenctionsCategory;
import com.mac.care_point.service.vehicle_attenctions.model.TJobVehicleAttenctions;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kavish manjitha
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/care-point/service/vehicle-attenctions/")
public class MVehicleAttenctionController {

    @Autowired
    private MVehicleAttenctionService vehicleAttenctionService;

    
    //master functions
    @RequestMapping(value = "/vehicle-attenctions-category", method = RequestMethod.GET)
    public List<MVehicleAttenctionsCategory> findAllAtenctionsCategory() {
        return vehicleAttenctionService.findAllAtenctionsCategory();
    }
    
    @RequestMapping(value = "/find-by-vehicle-attenctions-by-category/{category}", method = RequestMethod.GET)
    public List<MVehicleAttenctions> findAllAtenctions(@PathVariable Integer category) {
        return vehicleAttenctionService.findByCategory(category);
    }

    //transaction functions
    @RequestMapping(value = "/find-by-job-vehicle-attenctions-job-card/{jobCard}", method = RequestMethod.GET)
    public List<TJobVehicleAttenctions> findTJobVehicleAttenctionsByJobCard(@PathVariable Integer jobCard) {
        return vehicleAttenctionService.findByJobCard(jobCard);
    }

    @RequestMapping(value = "/save-job-vehicle-attenctions", method = RequestMethod.POST)
    public TJobVehicleAttenctions saveTJobVehicleAttenctions(@RequestBody TJobVehicleAttenctions jobVehicleAttenctions) {
        return vehicleAttenctionService.saveTJobVehicleAttenctions(jobVehicleAttenctions);
    }

    @RequestMapping(value = "/delete-job-vehicle-attenctions/{indexNo}", method = RequestMethod.GET)
    public Integer deleteTJobVehicleAttenctions(@PathVariable Integer indexNo) {
        return vehicleAttenctionService.deleteTJobVehicleAttenctions(indexNo);
    }

}
