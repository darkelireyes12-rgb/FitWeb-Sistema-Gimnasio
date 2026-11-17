
package com.example.demo.servicio;

import java.util.UUID;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.InscripcionDTO;
import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.RecuperarDTO;
import com.example.demo.dto.UsuarioDTO;
import com.example.demo.entidades.Plan;
import com.example.demo.entidades.Usuario;
import com.example.demo.excepcion.ReglaNegocioException;
import com.example.demo.repositorio.PlanRepository;
import com.example.demo.repositorio.UsuarioRepository;
import com.example.demo.util.Validaciones;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PlanRepository planRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository, PlanRepository planRepository,
            PasswordEncoder passwordEncoder, EmailService emailService, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.planRepository = planRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }

    public UsuarioDTO inscribir(InscripcionDTO dto) {
        
        if (dto.correo() == null || !dto.correo().contains("@") || dto.contrasena() == null
                || dto.telefono() == null || dto.telefono().isBlank()
                || dto.peso() == null || dto.talla() == null
                || dto.planId() == null || dto.sede() == null || dto.sede().isBlank()) {
            throw new ReglaNegocioException("Completa todos los campos.");
        }
        Validaciones.validarClave(dto.contrasena());

        String correo = Validaciones.normalizarCorreo(dto.correo());
        if (usuarioRepository.findByCorreo(correo) != null) {
            throw new ReglaNegocioException("Ese correo ya está registrado.");
        }

        String nombre = correo.substring(0, correo.indexOf("@"));

        Plan plan = planRepository.findById(dto.planId())
                .orElseThrow(() -> new ReglaNegocioException("El plan elegido no existe."));

        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setCorreo(correo);
        usuario.setContrasena(passwordEncoder.encode(dto.contrasena()));
        usuario.setTelefono(dto.telefono());
        usuario.setPeso(dto.peso());
        usuario.setTalla(dto.talla());
        usuario.setPlan(plan);
        usuario.setSede(dto.sede());
        usuario.setRol("USER");
        usuarioRepository.save(usuario);

        return new UsuarioDTO(usuario);
    }

    public String login(LoginDTO dto) {
        Usuario usuario = null;
        if (dto.correo() != null) {
            usuario = usuarioRepository.findByCorreo(Validaciones.normalizarCorreo(dto.correo()));
        }
        if (usuario == null || dto.contrasena() == null
                || !passwordEncoder.matches(dto.contrasena(), usuario.getContrasena())) {
            throw new BadCredentialsException("Correo o clave incorrectos");
        }
        return jwtService.generarToken(usuario);
    }

    public UsuarioDTO buscarPorCorreo(String correo) {
        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            throw new ReglaNegocioException("Usuario no encontrado.");
        }
        return new UsuarioDTO(usuario);
    }

    public void solicitarCodigo(RecuperarDTO dto) {
        if (dto.correo() == null || dto.correo().isBlank()) {
            throw new ReglaNegocioException("Ingresa tu correo.");
        }
        Usuario usuario = usuarioRepository.findByCorreo(Validaciones.normalizarCorreo(dto.correo()));

        if (usuario != null) {
            String token = UUID.randomUUID().toString();
            usuario.setTokenRecuperacion(token);
            usuarioRepository.save(usuario);
            try {
                emailService.enviarToken(usuario.getCorreo(), token);
            } catch (Exception e) {
                throw new ReglaNegocioException("No se pudo enviar el correo. Revisa la configuración de Gmail.");
            }
        }
    }

    public void validarToken(RecuperarDTO dto) {
        buscarPorToken(dto.token());
    }

    public void cambiarClave(RecuperarDTO dto) {
        Validaciones.validarClave(dto.nuevaClave());
        Usuario usuario = buscarPorToken(dto.token());

        usuario.setContrasena(passwordEncoder.encode(dto.nuevaClave()));
        usuario.setTokenRecuperacion(null);
        usuarioRepository.save(usuario);
    }

    private Usuario buscarPorToken(String token) {
        Usuario usuario = null;
        if (token != null) {
            usuario = usuarioRepository.findByTokenRecuperacion(token.trim());
        }
        if (usuario == null) {
            throw new ReglaNegocioException("El código es inválido o ya fue usado.");
        }
        return usuario;
    }
}