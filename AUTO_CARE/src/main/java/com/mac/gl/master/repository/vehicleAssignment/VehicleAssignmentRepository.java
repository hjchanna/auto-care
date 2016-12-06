/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.vehicleAssignment;

import com.mac.gl.master.model.vehicleAssignment.TVehicleAssignment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Supervision
 */
public interface VehicleAssignmentRepository extends JpaRepository<TVehicleAssignment, Integer>{

    public List<TVehicleAssignment> findByBranchAndJobCardStatusNot(Integer branch,String status );
    
    public List<TVehicleAssignment> findTop1ByJobCardIndexNoOrderByInTimeDesc(Integer jobCardIndexNo);    

//    public List<TVehicleAssignment> findByJobCardStatusNotIn(String status);
}