package com.idr.ecommerceIDR.services;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.ecommerceIDR.models.Pedidos;
import com.idr.ecommerceIDR.repositories.PedidosRepository;

@Service
public class PedidosService {

	private final PedidosRepository pedidosRepository;

    @Autowired
    public PedidosService(PedidosRepository pedidosRepository) {
		this.pedidosRepository = pedidosRepository;
	}

	public List<Pedidos> getAllPedidos(){
        return pedidosRepository.findAll();
    }//get todos

    public Pedidos getPedido(Long id) {
		return pedidosRepository.findById(id).orElseThrow(  
			()-> new IllegalArgumentException("La pedido con el id: " + id + " no existe.")   );
	}//get uno especifico

    public Pedidos deletePedido(Long id) {
    	Pedidos tmpPedido = null;
		if (pedidosRepository.existsById(id)) {
			tmpPedido = pedidosRepository.findById(id).get();
			pedidosRepository.deleteById(id);
		}
		return tmpPedido;
    }//borrar categoria

    public Pedidos addPedido(Pedidos pedido) {
		return pedidosRepository.save(pedido);
    }//agregar categoria
    
    //CAMBIO
    public List<Pedidos> addAllPedidos(List<Pedidos> Pedidos){
        return pedidosRepository.saveAll(Pedidos);
    }//addAllPedidos
    

    public Pedidos updatePedido(long id, String nombre) {
    	Pedidos tmpPedido = null;
		if (pedidosRepository.existsById(id)) {
			tmpPedido = pedidosRepository.findById(id).get();
			if (nombre!=null)tmpPedido.setNombre(nombre);
			pedidosRepository.save(tmpPedido);
		} else {
			System.out.println("Update - El pedido con el id: " + id + " no existe");
		}
		return tmpPedido;
	}//actualizar categoria

}