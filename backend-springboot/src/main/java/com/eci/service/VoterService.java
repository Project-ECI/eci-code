package com.eci.service;

import java.util.List;
import java.util.Optional;

import com.eci.dto.SearchElectrolRollDto;
import com.eci.dto.UpdateVoterDto;
import com.eci.dto.VoteDto;
import com.eci.dto.ChangePasswordDto;
import com.eci.dto.GetAllVoterForAdmin;
import com.eci.dto.KnowYourCandidateDto;
import com.eci.dto.LoginDto;
import com.eci.dto.VoterRegisterationDto;

import com.eci.entity.Voter;

public interface VoterService {
	public String registerVoter(VoterRegisterationDto voterRegisterDto);

	public Voter getVoterById(Long id);

	public String vote(VoteDto voteDto);

	public List<KnowYourCandidateDto> knowYourCandidate(String voterId);

	public List<KnowYourCandidateDto> knowYourCandidateGlobal(String districtId);

	public SearchElectrolRollDto searchVoter(String voterId);

	public String voterDelete(String id);

	public String updateProfile(UpdateVoterDto dto);

	public String changePassword(ChangePasswordDto passwordDto);

	public List<GetAllVoterForAdmin> getVoterForAdmin();
}
