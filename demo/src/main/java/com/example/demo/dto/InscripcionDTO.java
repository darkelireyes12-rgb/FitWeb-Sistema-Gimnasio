
package com.example.demo.dto;

public record InscripcionDTO(
                String correo,
                String contrasena,
                String telefono,
                Double peso, // kg
                Double talla, // cm
                Integer planId, // id del plan elegido (tb_plan)
                String sede) {
}