
package com.example.demo.dto;

import com.example.demo.entidades.Usuario;

public record UsuarioDTO(
        int id,
        String nombre,
        String correo,
        String rol,
        String telefono,
        Double peso,
        Double talla,
        Integer planId,
        String plan,
        String sede) {

    public UsuarioDTO(Usuario u) {
        this(u.getId(), u.getNombre(), u.getCorreo(), u.getRol(), u.getTelefono(),
                u.getPeso(), u.getTalla(),
                u.getPlan() != null ? u.getPlan().getId() : null,
                u.getPlan() != null ? u.getPlan().getNombre() : null,
                u.getSede());
    }
}