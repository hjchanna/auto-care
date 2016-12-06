/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.employee;

import com.mac.gl.master.model.employee.Employee;
import com.mac.gl.master.repository.employee.EmployeeRepository;
import com.mac.gl.system.exception.DuplicateEntityException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Supervision
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository ;

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    private Employee findByName(String name) {
        List<Employee> itemList = employeeRepository.findByName(name);
        if (itemList.isEmpty()) {
            return null;
        }
        return itemList.get(0);
    }

    public Employee saveItemDepartment(Employee employee) {
        Employee findByName = findByName(employee.getName());
        if (findByName == null) {
            return employeeRepository.save(employee);
        } else {
            if (findByName.getIndexNo().equals(employee.getIndexNo())) {
                return employeeRepository.save(employee);
            }
            throw new DuplicateEntityException("Duplicate name");
        }
    }

    public void deleteItemDepartment(Integer indexNo) {
        employeeRepository.delete(indexNo);
    }
}