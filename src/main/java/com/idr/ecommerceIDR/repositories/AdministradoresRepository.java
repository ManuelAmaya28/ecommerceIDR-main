package com.idr.ecommerceIDR.repositories;

import com.idr.ecommerceIDR.models.Administradores;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository //es un lugar donde guardo datoss
public interface AdministradoresRepository extends JpaRepository<Administradores, Long>  {
	Optional<Administradores> findByCorreo(String correo);
    
}//interface administradores repo
