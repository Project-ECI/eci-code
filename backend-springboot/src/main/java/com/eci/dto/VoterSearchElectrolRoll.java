package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VoterSearchElectrolRoll {
	private Long voterId;
	private String fullName;
	private boolean gender;
}
