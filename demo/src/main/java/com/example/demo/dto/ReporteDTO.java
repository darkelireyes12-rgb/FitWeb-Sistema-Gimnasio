
package com.example.demo.dto;

import java.util.List;

public record ReporteDTO(long usuarios, long reservasActivas, long reservasCanceladas, List<PorServicio> porServicio) {

    public record PorServicio(String servicio, long total) {
    }
}