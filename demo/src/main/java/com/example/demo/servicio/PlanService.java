
package com.example.demo.servicio;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.PlanDTO;
import com.example.demo.repositorio.PlanRepository;

@Service
public class PlanService {

    private final PlanRepository planRepository;

    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public List<PlanDTO> listar() {
        return planRepository.findAll().stream().map(PlanDTO::new).toList();
    }
}