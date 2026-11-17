

package com.example.demo.controlador;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UsuarioAdminDTO;
import com.example.demo.dto.UsuarioDTO;
import com.example.demo.servicio.AdminService;

@RestController
@RequestMapping("/api/admin/usuarios")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public List<UsuarioDTO> listar(@RequestParam(required = false) String buscar) {
        return adminService.listar(buscar);
    }

    @PutMapping("/{id}")
    public UsuarioDTO editar(@PathVariable Integer id, @RequestBody UsuarioAdminDTO dto,
            Authentication authentication) {
        return adminService.editar(id, dto, authentication.getName());
    }

    @DeleteMapping("/{id}")
    public Map<String, String> eliminar(@PathVariable Integer id, Authentication authentication) {
        adminService.eliminar(id, authentication.getName());
        return Map.of("mensaje", "Usuario eliminado.");
    }
}