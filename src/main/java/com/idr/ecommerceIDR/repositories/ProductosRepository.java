package com.idr.ecommerceIDR.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.idr.ecommerceIDR.models.Productos;

public interface ProductosRepository extends JpaRepository<Productos, Long> {
    Optional<Productos> findByNombre(String nombre);
}
