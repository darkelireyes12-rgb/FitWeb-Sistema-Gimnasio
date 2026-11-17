
package com.example.demo.controlador;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ServicioDTO;
import com.example.demo.servicio.ServicioService;

@RestController
@RequestMapping("/api/admin/servicios")
public class AdminServicioController {

    private final ServicioService servicioService;

    public AdminServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicioDTO crear(@RequestBody ServicioDTO dto) {
        return servicioService.crear(dto);
    }

    @PutMapping("/{id}")
    public ServicioDTO editar(@PathVariable Integer id, @RequestBody ServicioDTO dto) {
        return servicioService.editar(id, dto);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> eliminar(@PathVariable Integer id) {
        servicioService.eliminar(id);
        return Map.of("mensaje", "Servicio eliminado.");
    }
}