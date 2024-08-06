package com.eci.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eci.dto.CandidateNominationDto;
import com.eci.dto.CandidateRegisterDto;
import com.eci.service.CandidateService;

@RestController
@RequestMapping("/candidate")
public class CandidateController {
	@Autowired
	private CandidateService candidateService;
	
	@PostMapping("/register")
	public ResponseEntity<?> candidateRegister(@RequestBody CandidateRegisterDto candidateRegisterDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(candidateService.registerCandidate(candidateRegisterDto));
	}
	
	@PostMapping("/nomination")
	public ResponseEntity<?> candidateNomination(@RequestBody CandidateNominationDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(candidateService.nominateCandidate(dto));
	}
}