import React, { useState, useRef } from 'react'
import { Modal } from "react-bootstrap"
import { postProducto, postUploadImagenByProductoId } from '../../../services/productoService';


const formularioVacio = {
  producto_nom: "",
  producto_pre: 0,
  producto_img: "",
  producto_des: "",
}


const AdminModalCrearProducto = ({ mostrarModalCrear, setMostrarModalCrear, traerProductos }) => {

  const [formulario, setFormulario] = useState({ ...formularioVacio });

  const imagenRef = useRef();

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    postProducto(formulario).then((rpta) => {
      if (rpta.data.ok) { 
        postUploadImagenByProductoId(imagenRef.current.files[0], rpta.data.content.producto_id);
        setMostrarModalCrear(false);
        setFormulario(formularioVacio);
        traerProductos();
      }
    });

  }


  return (
    <Modal show={mostrarModalCrear} onHide={() => {
      setMostrarModalCrear(false)
    }} size={"xl"} >
      <Modal.Header closeButton>
        <Modal.Title>Crear Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="">Nombre:</label>
            <input type="text" className="form-control"
              value={formulario.producto_nom} name="producto_nom" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="">Precio:</label>
            <input type="number" className="form-control"
              value={formulario.producto_pre} name="producto_pre" onChange={handleChange} />
          </div>
    
          <div className="form-group">
            <label htmlFor="">Descripción:</label>
            <input type="text" className="form-control"
              value={formulario.producto_des} name="producto_des" onChange={handleChange} />
          </div>
          

          <div className="form-group">
             <button className="btn btn-primary" type="submit">Crear Producto</button>
          </div>
        </form>

        


      </Modal.Body>

    </Modal >
  )
}

export default AdminModalCrearProducto
