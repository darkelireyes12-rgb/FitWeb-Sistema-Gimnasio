
package com.example.demo.servicio;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.ReporteDTO;
import com.example.demo.dto.ReservaCrearDTO;
import com.example.demo.dto.ReservaDTO;
import com.example.demo.entidades.Reserva;
import com.example.demo.entidades.Servicio;
import com.example.demo.entidades.Usuario;
import com.example.demo.excepcion.ReglaNegocioException;
import com.example.demo.repositorio.ReservaRepository;
import com.example.demo.repositorio.ServicioRepository;
import com.example.demo.repositorio.UsuarioRepository;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final ServicioRepository servicioRepository;
    private final UsuarioRepository usuarioRepository;

    public ReservaService(ReservaRepository reservaRepository, ServicioRepository servicioRepository,
            UsuarioRepository usuarioRepository) {
        this.reservaRepository = reservaRepository;
        this.servicioRepository = servicioRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public ReservaDTO crear(String correo, ReservaCrearDTO dto) {
        if (dto.servicioId() == null || dto.fechaHora() == null) {
            throw new ReglaNegocioException("Elige un servicio y una fecha.");
        }
        if (!dto.fechaHora().isAfter(LocalDateTime.now())) {
            throw new ReglaNegocioException("La fecha de la reserva debe ser futura.");
        }
        Usuario usuario = buscarUsuario(correo);
        Servicio servicio = servicioRepository.findById(dto.servicioId())
                .orElseThrow(() -> new ReglaNegocioException("El servicio no existe."));

        if (reservaRepository.existsByUsuarioIdAndServicioIdAndFechaHoraAndEstado(
                usuario.getId(), servicio.getId(), dto.fechaHora(), Reserva.ACTIVA)) {
            throw new ReglaNegocioException("Ya tienes una reserva activa para ese servicio en esa fecha y hora.");
        }

        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario);
        reserva.setServicio(servicio);
        reserva.setFechaHora(dto.fechaHora());
        reserva.setEstado(Reserva.ACTIVA);
        reservaRepository.save(reserva);
        return new ReservaDTO(reserva);
    }

    public List<ReservaDTO> misReservas(String correo) {
        Usuario usuario = buscarUsuario(correo);
        return reservaRepository.findByUsuarioIdOrderByFechaHoraDesc(usuario.getId())
                .stream().map(ReservaDTO::new).toList();
    }

    public ReservaDTO cancelar(Integer id, String correo) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new ReglaNegocioException("La reserva no existe."));
        if (!reserva.getUsuario().getCorreo().equals(correo)) {
            throw new ReglaNegocioException("Solo puedes cancelar tus propias reservas.");
        }
        if (Reserva.CANCELADA.equals(reserva.getEstado())) {
            throw new ReglaNegocioException("La reserva ya estaba cancelada.");
        }
        reserva.setEstado(Reserva.CANCELADA);
        reservaRepository.save(reserva);
        return new ReservaDTO(reserva);
    }

    public List<ReservaDTO> listarTodas() {
        return reservaRepository.findAllByOrderByFechaHoraDesc().stream().map(ReservaDTO::new).toList();
    }

    public ReporteDTO reporte() {
        List<ReporteDTO.PorServicio> porServicio = reservaRepository.contarActivasPorServicio().stream()
                .map(fila -> new ReporteDTO.PorServicio((String) fila[0], (Long) fila[1]))
                .toList();
        return new ReporteDTO(usuarioRepository.count(),
                reservaRepository.countByEstado(Reserva.ACTIVA),
                reservaRepository.countByEstado(Reserva.CANCELADA),
                porServicio);
    }

    private Usuario buscarUsuario(String correo) {
        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            throw new ReglaNegocioException("Usuario no encontrado.");
        }
        return usuario;
    }
}