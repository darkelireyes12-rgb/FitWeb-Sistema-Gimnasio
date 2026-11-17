
package com.example.demo.servicio;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.UsuarioAdminDTO;
import com.example.demo.dto.UsuarioDTO;
import com.example.demo.entidades.Plan;
import com.example.demo.entidades.Usuario;
import com.example.demo.excepcion.ReglaNegocioException;
import com.example.demo.repositorio.PlanRepository;
import com.example.demo.repositorio.UsuarioRepository;
import com.example.demo.util.Validaciones;

@Service
public class AdminService {

    private final UsuarioRepository usuarioRepository;
    private final PlanRepository planRepository;

    public AdminService(UsuarioRepository usuarioRepository, PlanRepository planRepository) {
        this.usuarioRepository = usuarioRepository;
        this.planRepository = planRepository;
    }

    public List<UsuarioDTO> listar(String buscar) {
        List<Usuario> usuarios;
        if (buscar == null || buscar.isBlank()) {
            usuarios = usuarioRepository.findAll();
        } else {
            usuarios = usuarioRepository.buscarPorTexto(buscar.trim());
        }
        return usuarios.stream().map(UsuarioDTO::new).toList();
    }

    public UsuarioDTO editar(Integer id, UsuarioAdminDTO dto, String correoAdmin) {
        Usuario usuario = buscarPorId(id);
        if (dto.correo() == null || !dto.correo().contains("@")) {
            throw new ReglaNegocioException("Escribe un correo válido.");
        }
        if (dto.telefono() == null || dto.telefono().isBlank()) {
            throw new ReglaNegocioException("El teléfono es obligatorio.");
        }

        String correoNuevo = Validaciones.normalizarCorreo(dto.correo());

        Usuario otro = usuarioRepository.findByCorreo(correoNuevo);
        if (otro != null && otro.getId() != usuario.getId()) {
            throw new ReglaNegocioException("Ese correo ya está registrado.");
        }

        if (usuario.getCorreo().equals(correoAdmin) && !correoNuevo.equals(usuario.getCorreo())) {
            throw new ReglaNegocioException("No puedes cambiar tu propio correo desde el panel.");
        }

        Plan plan = null;
        if (dto.planId() != null) {
            plan = planRepository.findById(dto.planId())
                    .orElseThrow(() -> new ReglaNegocioException("El plan elegido no existe."));
        }

        usuario.setCorreo(correoNuevo);
        usuario.setTelefono(dto.telefono().trim());
        usuario.setPlan(plan);
        usuarioRepository.save(usuario);
        return new UsuarioDTO(usuario);
    }

    public void eliminar(Integer id, String correoAdmin) {
        Usuario usuario = buscarPorId(id);
        if (usuario.getCorreo().equals(correoAdmin)) {
            throw new ReglaNegocioException("No puedes eliminar tu propia cuenta.");
        }
        usuarioRepository.delete(usuario);
    }

    private Usuario buscarPorId(Integer id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ReglaNegocioException("El usuario no existe."));
    }
}