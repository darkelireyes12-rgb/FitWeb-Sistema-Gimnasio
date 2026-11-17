
package com.example.demo.dto;

import com.example.demo.entidades.Servicio;

public record ServicioDTO(Integer id, String nombre, String descripcion, Double precio) {

    public ServicioDTO(Servicio s) {
        this(s.getId(), s.getNombre(), s.getDescripcion(), s.getPrecio());
    }
}