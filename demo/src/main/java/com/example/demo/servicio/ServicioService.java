
package com.example.demo.servicio;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.ServicioDTO;
import com.example.demo.entidades.Servicio;
import com.example.demo.excepcion.ReglaNegocioException;
import com.example.demo.repositorio.ReservaRepository;
import com.example.demo.repositorio.ServicioRepository;

@Service
public class ServicioService {

    private final ServicioRepository servicioRepository;
    private final ReservaRepository reservaRepository;

    public ServicioService(ServicioRepository servicioRepository, ReservaRepository reservaRepository) {
        this.servicioRepository = servicioRepository;
        this.reservaRepository = reservaRepository;
    }

    public List<ServicioDTO> listar(String buscar) {
        List<Servicio> servicios;
        if (buscar == null || buscar.isBlank()) {
            servicios = servicioRepository.findAll();
        } else {
            servicios = servicioRepository.buscarPorNombre(buscar.trim());
        }
        return servicios.stream().map(ServicioDTO::new).toList();
    }

    public ServicioDTO crear(ServicioDTO dto) {
        validar(dto);
        Servicio servicio = new Servicio();
        pasarDatos(servicio, dto);
        servicioRepository.save(servicio);
        return new ServicioDTO(servicio);
    }

    public ServicioDTO editar(Integer id, ServicioDTO dto) {
        validar(dto);
        Servicio servicio = buscarPorId(id);
        pasarDatos(servicio, dto);
        servicioRepository.save(servicio);
        return new ServicioDTO(servicio);
    }

    public void eliminar(Integer id) {
        Servicio servicio = buscarPorId(id);
        if (reservaRepository.existsByServicioId(id)) {
            throw new ReglaNegocioException("No se puede eliminar: el servicio ya tiene reservas.");
        }
        servicioRepository.delete(servicio);
    }

    private Servicio buscarPorId(Integer id) {
        return servicioRepository.findById(id)
                .orElseThrow(() -> new ReglaNegocioException("El servicio no existe."));
    }

    private void validar(ServicioDTO dto) {
        if (dto.nombre() == null || dto.nombre().isBlank()) {
            throw new ReglaNegocioException("El nombre del servicio es obligatorio.");
        }
        if (dto.precio() == null || dto.precio() < 0) {
            throw new ReglaNegocioException("Escribe un precio válido.");
        }
    }

    private void pasarDatos(Servicio servicio, ServicioDTO dto) {
        servicio.setNombre(dto.nombre().trim());
        servicio.setDescripcion(dto.descripcion());
        servicio.setPrecio(dto.precio());
    }
}