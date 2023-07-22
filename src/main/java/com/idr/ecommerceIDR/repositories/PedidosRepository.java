package com.idr.ecommerceIDR.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.idr.ecommerceIDR.models.Pedidos;

import java.util.Optional;

@Repository
public interface PedidosRepository extends JpaRepository<Pedidos, Long>{
    Optional<Pedidos> findByNombre(String nombre);
}