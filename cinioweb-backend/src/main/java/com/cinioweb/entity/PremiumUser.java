package com.cinioweb.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;

@Entity
//@DiscriminatorValue("PremiumUser")  discrinator type column value (default dtype col)
public class PremiumUser extends User{

	
	@Column(name = "premium_Paid_Date")
	private LocalDate  premiumPaidDate;
	
	@Column(name = "valid_Untill")
	private LocalDate  validUntill;
		
	
	public LocalDate getPremiumPaidDate() {
		return premiumPaidDate;
	}

	public void setPremiumPaidDate(LocalDate premiumPaidDate) {
		this.premiumPaidDate = premiumPaidDate;
	}

	public LocalDate getValidUntill() {
		return validUntill;
	}

	public void setValidUntill(LocalDate validUntill) {
		this.validUntill = validUntill;
	}

	public PremiumUser() {
		// TODO Auto-generated constructor stub
	}

	
		
}
