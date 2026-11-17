

package com.example.demo.dto;

import java.time.LocalDateTime;

import com.example.demo.entidades.Reserva;

public record ReservaDTO(int id, String cliente, int servicioId, String servicio, LocalDateTime fechaHora,
        String estado) {

    public ReservaDTO(Reserva r) {
        this(r.getId(), r.getUsuario().getCorreo(), r.getServicio().getId(), r.getServicio().getNombre(),
                r.getFechaHora(), r.getEstado());
    }
}