
package com.example.demo.controlador;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ReservaCrearDTO;
import com.example.demo.dto.ReservaDTO;
import com.example.demo.servicio.ReservaService;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReservaDTO crear(@RequestBody ReservaCrearDTO dto, Authentication authentication) {
        return reservaService.crear(authentication.getName(), dto);
    }

    @GetMapping("/mias")
    public List<ReservaDTO> mias(Authentication authentication) {
        return reservaService.misReservas(authentication.getName());
    }

    @PutMapping("/{id}/cancelar")
    public ReservaDTO cancelar(@PathVariable Integer id, Authentication authentication) {
        return reservaService.cancelar(id, authentication.getName());
    }
}