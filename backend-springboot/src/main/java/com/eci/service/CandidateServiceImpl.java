package com.eci.service;

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
import com.eci.dto.DeleteDto;
import com.eci.entity.Candidate;
import com.eci.entity.District;
import com.eci.entity.Party;
import com.eci.entity.Voter;

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
				return "Login Successfull";
			}
		}
		return "Login Fail";
	}

	public String nominateCandidate(CandidateNominationDto dto) {
		Optional<Candidate> candidateOpt = candidateDao.findById(dto.getCandidateId());
		if (candidateOpt.isPresent()) {
			Optional<Party> partyOpt = partyDao.findById(dto.getParty());
			Optional<District> districtOpt = districtDao.findById(dto.getConstituency());

			if (partyOpt.isPresent()) {
				dto.setIndependent(false);
			} else {
				dto.setParty(null);
				dto.setIndependent(true);
			}

			Candidate candidate1 = new Candidate();
			candidate1.setVoterId(candidateOpt.get().getVoterId());
			candidate1.setCandidateId(dto.getCandidateId());
			candidate1.setConstituency(districtOpt.get());
			candidate1.setParty(partyOpt.get());
			candidate1.setIndependent(dto.isIndependent());

			Candidate candidate = candidateDao.save(candidate1);
			return "Candidate Nominate Successfully " + candidate;
		}
		return "Candidate Nominate Failed ";
	}

	@Override
	public Optional<Candidate> getCandidateById(Long id) {
		return candidateDao.findById(id);
	}

	@Override
	public String candidateDelete(DeleteDto candidate) {
		Optional<Candidate> candidateOpt = candidateDao.findById(candidate.getId());
		System.out.println(candidateOpt.get());
		if (candidateOpt.isPresent() && candidateOpt.get().isActive() == true) {
			candidateOpt.get().setActive(false);
			candidateDao.save(candidateOpt.get());
			return "Candidate Deleted Successfully";
		}
		return "Candidate not found";
	}

	@Override
	public String formStatus(Long candidateId) {
		Optional<Candidate> candidateOpt = candidateDao.findById(candidateId);
		if (candidateOpt.get().isAccepted())
			return "Your Form Accepted By Party";
		else if (candidateOpt.get().isAccepted() == false && candidateOpt.get().isRejected() == false)
			return "Your form is pending";
		else
			return "Your form is Rejected by party";
	}
}
