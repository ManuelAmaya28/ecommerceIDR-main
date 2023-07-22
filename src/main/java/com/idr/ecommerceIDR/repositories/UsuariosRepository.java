package com.idr.ecommerceIDR.repositories;

import java.util.Optional;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.idr.ecommerceIDR.models.Usuarios;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Long> {
	Optional<Usuarios> findByCorreo(String correo);
}//interface usuariosRepository