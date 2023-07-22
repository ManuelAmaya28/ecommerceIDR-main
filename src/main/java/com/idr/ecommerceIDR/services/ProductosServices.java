package com.idr.ecommerceIDR.services;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.idr.ecommerceIDR.models.Productos;
import com.idr.ecommerceIDR.repositories.ProductosRepository;

@Service
public class ProductosServices {
    private final ProductosRepository productosRepository;
    @Autowired
    public ProductosServices(ProductosRepository productosRepository) {
    	this.productosRepository = productosRepository;
    }//constructor
    
    public List<Productos> getAllProductos(){
    	return productosRepository.findAll();
    }//getAll
    
    public Productos getProducto(Long id) {
		return productosRepository.findById(id).orElseThrow(
				()-> new IllegalArgumentException("El producto con el id: " + id + " no existe.")
			);
	}//getProducto
    
    public Productos deleteProducto(Long id) {
    	Productos tmpProd = null;
			if (productosRepository.existsById(id)) {
				tmpProd = productosRepository.findById(id).get();
				productosRepository.deleteById(id);
			}//if
		return tmpProd;
	}//deleteProducto
    
    public Productos addproducto(Productos producto) {
		Productos tmProducto = null;
		if (productosRepository.findByNombre(producto.getNombre()).isEmpty()) {
			tmProducto = productosRepository.save(producto);
		} else {
			System.out.println("Ya existe un producto con ese nombre!");
		}
		return tmProducto;
	}//addProducto
    
    public Productos updateProducto(Long id, String nombre, String descripcion, Double precio, Long stock, String categoria, Long cantidad, String imagen) {
    	Productos tmpProd = null;
		if(productosRepository.existsById(id)) {
			tmpProd = productosRepository.findById(id).get();
				if (nombre!=null)tmpProd.setNombre(nombre);
				if (descripcion!=null)tmpProd.setDescripcion(descripcion);
				if (stock!=null)tmpProd.setStock(stock);
				if (precio!=null)tmpProd.setPrecio(precio.doubleValue());
				if (categoria!=null)tmpProd.setCategorias_id(categoria);	
				if (cantidad!=null)tmpProd.setStock(cantidad);
				if (imagen!=null)tmpProd.setImagen(imagen);		
				productosRepository.save(tmpProd);
			} else {
				System.out.println("Update - El producto con el id: " + id + " no existe");
			}
		return tmpProd;
	}//updateProducto
}
