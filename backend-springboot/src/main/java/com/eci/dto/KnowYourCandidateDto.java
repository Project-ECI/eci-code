package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KnowYourCandidateDto {
	private String candiateName;
	
	private String partyName;
	
	private boolean isIndependent;
}
