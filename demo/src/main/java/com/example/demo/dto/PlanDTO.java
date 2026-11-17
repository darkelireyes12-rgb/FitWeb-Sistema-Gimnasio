
package com.example.demo.dto;

import com.example.demo.entidades.Plan;

public record PlanDTO(int id, String nombre, Double mensualidad, String beneficios) {


    public PlanDTO(Plan p) {
        this(p.getId(), p.getNombre(), p.getMensualidad(), p.getBeneficios());
    }
}