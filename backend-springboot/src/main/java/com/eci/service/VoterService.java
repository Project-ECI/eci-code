package com.eci.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.RequestBody;

import com.eci.dto.SearchElectrolRoll;
import com.eci.dto.VoteDto;
import com.eci.dto.VoterKnowYourCandidate;
import com.eci.dto.VoterLoginDto;
import com.eci.dto.VoterRegisterDto;
import com.eci.entity.Voter;

public interface VoterService {
	public VoterRegisterDto registerVoter(VoterRegisterDto voterRegisterDto);
	
	public String loginVoter(VoterLoginDto voterLoginDto);
	
	public Optional<Voter> getVoterById(Long id);
	
	public String vote(VoteDto voteDto);
	
	public List<VoterKnowYourCandidate> knowYourCandidate(Long voterId);
	
	public SearchElectrolRoll searchVoter(Long voterId);
}
