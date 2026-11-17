
package com.example.demo.controlador;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ReporteDTO;
import com.example.demo.dto.ReservaDTO;
import com.example.demo.servicio.ReservaService;

@RestController
@RequestMapping("/api/admin")
public class AdminReservaController {

    private final ReservaService reservaService;

    public AdminReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    // GET /api/admin/reservas
    @GetMapping("/reservas")
    public List<ReservaDTO> reservas() {
        return reservaService.listarTodas();
    }

    // GET /api/admin/reportes
    @GetMapping("/reportes")
    public ReporteDTO reporte() {
        return reservaService.reporte();
    }
}