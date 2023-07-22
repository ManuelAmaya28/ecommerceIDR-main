package com.idr.ecommerceIDR.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "productos")
public class Productos {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private long id;
	@Column(nullable = false)
	private String nombre;
	@Column(nullable = false)
	private String descripcion;
	@Column(nullable = false)
	private double precio;
	@Column(nullable = false)
	private long stock;
	@Column(nullable = false)
	private String categorias_id;
	@Column(nullable = false)
	private long cantidad;
	@Column(name = "imagen", nullable = false, columnDefinition = "MEDIUMTEXT")
	private String imagen;
	// private static long total=0;

	public Productos(String nombre, String descripcion, double precio, long stock, String categorias_id, long cantidad,
			String imagen) {
		super();
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.precio = precio;
		this.stock = stock;
		this.categorias_id = categorias_id;
		this.cantidad = cantidad;
		this.imagen = imagen;
	}

	public Productos() {

	}// constructor default

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public double getPrecio() {
		return precio;
	}

	public void setPrecio(double precio) {
		this.precio = precio;
	}

	public long getStock() {
		return stock;
	}

	public void setStock(long stock) {
		this.stock = stock;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCategorias_id() {
		return categorias_id;
	}

	public void setCategorias_id(String categorias_id) {
		this.categorias_id = categorias_id;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	
	public long getCantidad() {
		return cantidad;
	}

	public void setCantidad(long cantidad) {
		this.cantidad = cantidad;
	}


}// class productos
