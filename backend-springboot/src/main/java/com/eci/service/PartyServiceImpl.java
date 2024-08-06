package com.eci.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.PartyDao;
import com.eci.dto.PartyLoginDto;
import com.eci.dto.PartyRegistrationDto;
import com.eci.entity.Party;

@Service
@Transactional
public class PartyServiceImpl implements PartyService{
	@Autowired
	private PartyDao partyDao;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public PartyRegistrationDto registerParty(PartyRegistrationDto partyDto) {
		Party party = mapper.map(partyDto, Party.class);
		Party savedParty = partyDao.save(party);
		
		return mapper.map(savedParty, PartyRegistrationDto.class);
	}

	@Override
	public String loginParty(PartyLoginDto partyDto) {
		Party party = mapper.map(partyDto, Party.class);
		Party party2 = partyDao.findByEmail(party.getEmail());
		
		if (party2 != null && party.getPassword().equals(party2.getPassword()))
			return "success";
		return "fail";
	}
}