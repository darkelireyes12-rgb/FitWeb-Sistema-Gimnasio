
package com.example.demo.util;

import com.example.demo.excepcion.ReglaNegocioException;

public class Validaciones {

    private static final int CLAVE_MINIMA = 6;

    private Validaciones() {
    }

    public static void validarClave(String clave) {
        if (clave == null || clave.length() < CLAVE_MINIMA) {
            throw new ReglaNegocioException("La contraseña debe tener al menos 6 caracteres.");
        }
    }

    public static String normalizarCorreo(String correo) {
        return correo.trim().toLowerCase();
    }
}