
package com.example.demo.controlador;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.InscripcionDTO;
import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.RecuperarDTO;
import com.example.demo.dto.UsuarioDTO;
import com.example.demo.servicio.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/inscripcion")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioDTO inscripcion(@RequestBody InscripcionDTO dto) {
        return authService.inscribir(dto);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginDTO dto) {
        return Map.of("token", authService.login(dto));
    }

    @GetMapping("/me")
    public UsuarioDTO me(Authentication authentication) {
        return authService.buscarPorCorreo(authentication.getName());
    }

    @PostMapping("/recuperar/solicitar")
    public Map<String, String> solicitarCodigo(@RequestBody RecuperarDTO dto) {
        authService.solicitarCodigo(dto);
        return Map.of("mensaje", "Si el correo está registrado, te enviamos un código.");
    }

    @PostMapping("/recuperar/validar")
    public Map<String, String> validarToken(@RequestBody RecuperarDTO dto) {
        authService.validarToken(dto);
        return Map.of("mensaje", "Código correcto.");
    }

    @PostMapping("/recuperar/cambiar")
    public Map<String, String> cambiarClave(@RequestBody RecuperarDTO dto) {
        authService.cambiarClave(dto);
        return Map.of("mensaje", "Contraseña actualizada.");
    }
}