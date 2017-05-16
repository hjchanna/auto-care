/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.invoice.invoice;

import com.mac.care_point.service.invoice.invoice.model.TInvoice;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.invoice.invoice.model.InvoicePayment;
import com.mac.care_point.service.invoice.invoice.model.TCustomerLedger;
import com.mac.care_point.service.invoice.invoice.model.TPayment;
import com.mac.care_point.service.invoice.invoice.model.TPaymentInformation;
import com.mac.care_point.service.job_card.JobCardRepository;
import com.mac.care_point.service.job_card.model.JobCard;
import com.mac.care_point.system.exception.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.Date;

/**
 *
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ClientLegerRepository clientLegerRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentInformationRepostory paymentInformationRepostory;

    @Autowired
    private JobCardRepository jobCardRepository;

    public List<TInvoice> findByJobCard(Integer jobCard) {
        return invoiceRepository.findByJobCard(jobCard);
    }

    @Transactional
    public TInvoice saveInvoice(InvoicePayment invoicePayment) {
        TInvoice invoice = invoicePayment.getInvoice();
        TPayment payment = invoicePayment.getPayment();
        List<TPaymentInformation> paymentInformationList = invoicePayment.getPaymentInformationsList();

        JobCard jobCard = jobCardRepository.getOne(invoice.getJobCard());
        jobCard.setStatus(Constant.FINISHE_STATUS);

        invoice.setBranch(1);
        //step 01
        //invoice save
        if (invoice.getIndexNo() == null) {
            Integer maxNo = invoiceRepository.getMaximumNumberByBranch(invoice.getBranch());
            if (maxNo == null) {
                maxNo = 0;
            }
            invoice.setNumber(maxNo + 1);
        }

        invoice.setStatus(Constant.INVOICE_FORM);
        TInvoice tInvoice = invoiceRepository.save(invoice);

        //client cledger save  - create invoice
        TCustomerLedger customerLedger = new TCustomerLedger();
        customerLedger.setCreditAmount(invoice.getNetAmount());
        customerLedger.setDate(new Date());
        customerLedger.setInvoice(tInvoice.getIndexNo());
        customerLedger.setType(Constant.INVOICE_CREATE);
        customerLedger.setClient(jobCard.getClient());
        System.out.println(jobCard.getClient());
        clientLegerRepository.save(customerLedger);

        //step 02
        //payment save
        TPayment savePaymentData = paymentRepository.save(payment);

        //payment informations
        for (TPaymentInformation tPaymentInformation : paymentInformationList) {
            tPaymentInformation.setFormName(Constant.INVOICE_FORM);
            tPaymentInformation.setPayment(savePaymentData.getIndexNo());

            if (!"OVER_PAYMENT".equals(tPaymentInformation.getType())) {
                //client cledger save  - payment invoice
                TCustomerLedger customerLedgerPaymnetSave = new TCustomerLedger();
                customerLedgerPaymnetSave.setDebitAmount(tPaymentInformation.getAmount());
                customerLedgerPaymnetSave.setDate(new Date());
                customerLedgerPaymnetSave.setInvoice(tInvoice.getIndexNo());
                customerLedgerPaymnetSave.setType(Constant.INVOICE_PAYMENT);
                customerLedgerPaymnetSave.setPayment(savePaymentData.getIndexNo());
                System.out.println(jobCard.getClient());
                customerLedgerPaymnetSave.setClient(jobCard.getClient());
                clientLegerRepository.save(customerLedgerPaymnetSave);
            }

            paymentInformationRepostory.save(tPaymentInformation);
        }

        //step 03
        //job card finished status
        jobCardRepository.save(jobCard);

        return tInvoice;
    }

    public BigDecimal addClientOverPayment(Integer client) {
        return clientLegerRepository.addClientOverPayment(client);
    }

    @Transactional
    public InvoicePayment loadInvoiceDetails(Integer invoiceNumber, Integer branch) {
        
        //get invoice data
        List<TInvoice> getInvoiceList = invoiceRepository.findByNumberAndBranch(invoiceNumber, branch);
        TInvoice tInvoice = getInvoiceList.get(0);
        
        
        if (getInvoiceList.isEmpty()) {
            throw new EntityNotFoundException("invoice not found for number " + invoiceNumber);
        } else {

            //client leger data
            List<TCustomerLedger> getClientLegerList = clientLegerRepository.findByInvoiceAndCreditAmountIsNull(tInvoice.getIndexNo());
            TCustomerLedger customerLedger = getClientLegerList.get(0);

            //get payment data
            TPayment tPayment = paymentRepository.findOne(customerLedger.getPayment());
            
            //payment informetion list
            List<TPaymentInformation> getPaymnetInformationList = paymentInformationRepostory.findByPayment(tPayment.getIndexNo());
           
            //fill invoicePayment
            InvoicePayment invoicePayment = new InvoicePayment();
            invoicePayment.setInvoice(tInvoice);
            invoicePayment.setPayment(tPayment);
            invoicePayment.setPaymentInformationsList(getPaymnetInformationList);

            return invoicePayment;
        }
    }
}