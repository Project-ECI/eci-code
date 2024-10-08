package com.eci.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.CandidateDao;
import com.eci.dao.DistrictDao;
import com.eci.dao.PartyDao;
import com.eci.dao.VoterDao;

import com.eci.dto.LoginDto;
import com.eci.dto.CandidateNominationDto;
import com.eci.dto.CandidateRegistrationDto;
import com.eci.dto.GetAllVoterForAdmin;
import com.eci.entity.Candidate;
import com.eci.entity.District;
import com.eci.entity.Party;
import com.eci.entity.UserRole;
import com.eci.entity.Voter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Transactional
public class CandidateServiceImpl implements CandidateService {
	@Autowired
	private CandidateDao candidateDao;

	@Autowired
	private DistrictDao districtDao;

	@Autowired
	private VoterDao voterDao;

	@Autowired
	private PartyDao partyDao;
	
	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public String registerCandidate(CandidateRegistrationDto candidateRegisterDto) {
		Optional<Voter> voterOpt = voterDao.findById(candidateRegisterDto.getVoterId());

		if (voterOpt.isPresent() && voterOpt.get().isActive() == true) {
			if (voterOpt.get().getPassword().equals(candidateRegisterDto.getPassword())) {
				Optional<Candidate> candidateOpt = candidateDao.findByVoterId(voterOpt.get());
				if (candidateOpt.isEmpty()) {
					Candidate validCandidate = new Candidate();
					validCandidate.setActive(true);
					validCandidate.setVoterId(voterOpt.get());
					validCandidate.setRole(UserRole.ROLE_CANDIDATE);
					Candidate savedCandidate = candidateDao.save(validCandidate);
					return "candidate register successfully" + savedCandidate.toString();
				}
			}
			return "voter not found";
		}
		return "candidate register failed";
	}

	@Override
	public String loginCandidate(LoginDto candidLoginDto) {
		Optional<Voter> voterOpt = voterDao.findByEmail(candidLoginDto.getEmail());
		Optional<Candidate> candidateOpt = candidateDao.findByVoterId(voterOpt.get());
		if (voterOpt.isPresent() && candidateOpt.isPresent()) {
			if (voterOpt.get().getPassword().equals(candidLoginDto.getPassword())
					&& candidateOpt.get().isActive() == true) {
				try {
					return objectMapper.writeValueAsString(candidateOpt.get());
				} catch (JsonProcessingException e) {
					return "success";
				}
			}
		}
		return "fail";
	}

	public String nominateCandidate(CandidateNominationDto dto) {
		Long candidateId=Long.parseLong(dto.getCandidateId());
		Optional<Candidate> candidateOpt = candidateDao.findById(candidateId);
		if (candidateOpt.isPresent()) {
			if (dto.getParty()!=null) {
				Long partyId=Long.parseLong(dto.getParty());
				Optional<Party> partyOpt = partyDao.findById(partyId);
				Long districtId=Long.parseLong(dto.getConstituency());
				Optional<District> districtOpt = districtDao.findById(districtId);
				if (partyOpt.isPresent()) {
					dto.setIndependent(false);
				} else {
					dto.setParty(null);
					dto.setIndependent(true);
				}
				Candidate candidate1 = new Candidate();
				candidate1.setVoterId(candidateOpt.get().getVoterId());
				candidate1.setUserId(candidateId);
				candidate1.setConstituency(districtOpt.get());
				candidate1.setPartyId(partyOpt.get());
				candidate1.setIndependent(dto.isIndependent());

				Candidate candidate = candidateDao.save(candidate1);
				return "Candidate Nominate Successfully " + candidate;
			}	
		}
		return "Candidate Nominate Failed ";
	}

	@Override
	public Optional<Candidate> getCandidateById(Long id) {
		return candidateDao.findById(id);
	}

	@Override
	public String candidateDelete(String id) {
		Long candidateId=Long.parseLong(id);
		Optional<Candidate> candidateOpt = candidateDao.findById(candidateId);
		System.out.println(candidateOpt.get());
		if (candidateOpt.isPresent() && candidateOpt.get().isActive() == true) {
			candidateOpt.get().setActive(false);
			candidateDao.save(candidateOpt.get());
			return "success";
		}
		return "fail";
	}

	@Override
	public String formStatus(String candidateid) {
		Long candidateId=Long.parseLong(candidateid);
		Optional<Candidate> candidateOpt = candidateDao.findById(candidateId);
		if (candidateOpt.get().isIndependent())
			return "NA";
		else if (candidateOpt.get().isAccepted())
			return "accepted";
		else if (candidateOpt.get().isAccepted() == false && candidateOpt.get().isRejected() == false)
			return "pending";
		else if (candidateOpt.get().getConstituency().getDistrictId() == null) {
			return "not filled";
		}
		else
			return "rejected";
	}

	@Override
	public List<GetAllVoterForAdmin> getCndidateForAdmin() {
		List<Candidate> candidateList = candidateDao.findAll();
		List<GetAllVoterForAdmin> dtoList = new ArrayList<GetAllVoterForAdmin>();

		for (Candidate candidate : candidateList) {
			if (candidate.isActive()) {
				GetAllVoterForAdmin dto=new GetAllVoterForAdmin();
				dto.setEmail(candidate.getVoterId().getEmail());
				dto.setFullName(candidate.getVoterId().getName());
				dto.setMobileNo(candidate.getVoterId().getMobileNo());
				dto.setVoterId(candidate.getUserId().toString());
				dtoList.add(dto);
			}
		}
		return dtoList;
	}
}
