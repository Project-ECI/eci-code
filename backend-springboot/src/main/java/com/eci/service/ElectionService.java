package com.eci.service;

import java.util.List;

import com.eci.dto.ElectionDateDto;
import com.eci.dto.ElectionResultDto;

public interface ElectionService {
	public String addElectionDate(ElectionDateDto dto);

	public List<ElectionResultDto> getResult();

	public List<ElectionResultDto> getResultConstituency(String voterId);

	public List<ElectionDateDto> getElectionDate();

	public ElectionDateDto getConstituencyElection(String voterId);

	public String declaredResult(String districtId);
	
	public boolean isResultDeclared(Long districtId);
	
	public boolean isElectionDate(Long districtId);
}
