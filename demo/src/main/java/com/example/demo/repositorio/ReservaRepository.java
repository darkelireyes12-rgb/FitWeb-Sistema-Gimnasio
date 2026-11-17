

package com.example.demo.repositorio;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entidades.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

    List<Reserva> findByUsuarioIdOrderByFechaHoraDesc(Integer usuarioId);

    List<Reserva> findAllByOrderByFechaHoraDesc();

    boolean existsByUsuarioIdAndServicioIdAndFechaHoraAndEstado(Integer usuarioId, Integer servicioId,
            LocalDateTime fechaHora, String estado);

    boolean existsByServicioId(Integer servicioId);

    long countByEstado(String estado);

    @Query("SELECT r.servicio.nombre, COUNT(r) FROM Reserva r WHERE r.estado = 'ACTIVA' "
            + "GROUP BY r.servicio.nombre ORDER BY COUNT(r) DESC")
    List<Object[]> contarActivasPorServicio();
}