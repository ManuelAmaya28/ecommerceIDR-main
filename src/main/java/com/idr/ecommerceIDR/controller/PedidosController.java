package com.idr.ecommerceIDR.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.idr.ecommerceIDR.models.Pedidos;
import com.idr.ecommerceIDR.services.PedidosService;


@RestController
@RequestMapping(path = "/pedidos/")
public class PedidosController {

    private final PedidosService pedidosService;

    @Autowired
    public PedidosController(PedidosService pedidosService){
        this.pedidosService = pedidosService;
    }

    @GetMapping
    public List<Pedidos> getAllPedidos(){
        return pedidosService.getAllPedidos();
    }
    
    @GetMapping(path = "{pedidoId}")
    public Pedidos getPedido(@PathVariable("pedidoId")  Long id){
        return pedidosService.getPedido(id);
    }
    @DeleteMapping(path = "{pedidoId}")
    public Pedidos removePedido(@PathVariable("pedidoId")  Long id){
        return pedidosService.deletePedido(id);
    }
    @PostMapping
    public Pedidos addPedido(@RequestBody Pedidos pedido){
        return pedidosService.addPedido(pedido);
    }
    
    //CAMBIO
    @PostMapping(path="arreglo")
    public List<Pedidos> addAllPedidos(@RequestBody List<Pedidos> pedido){
        return pedidosService.addAllPedidos(pedido);
    }

    @PutMapping(path = "{pedidoId}")
    public Pedidos updatePedido (@PathVariable("pedidoId") long id,
    @RequestParam(required = false) String nombre){
        return pedidosService.updatePedido(id, nombre);
    }

}
