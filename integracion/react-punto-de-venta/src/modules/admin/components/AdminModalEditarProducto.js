import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap"
import { putProductoById } from '../../../services/productoService';

const AdminModalEditarProducto = ({
  mostrarModalEditar,
  setMostrarModalEditar,
  objProductoEditar,
  traerProductos }) => {

  const [formulario, setFormulario] = useState(objProductoEditar);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    setFormulario({ ...objProductoEditar })
  }, [objProductoEditar])

  const handleSubmit = e => {
    e.preventDefault();
    putProductoById(formulario).then(rpta => {
      if (rpta.data.ok) {
        alert("Producto editado correctamente");
        setMostrarModalEditar(false);
        traerProductos();
      }
    })
  }


  return (
    <Modal show={mostrarModalEditar} onHide={() => {
      // settear objMesaEditar a null nuevamente
      setMostrarModalEditar(false)
    }} size={"xl"} >
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          formulario ?
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="">Id:</label>
                <input type="text" className="form-control" value={formulario.producto_id} disabled />
              </div>
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
                <button className="btn btn-primary" type="submit">Guardar Cambios</button>
              </div>
            </form> : null
        }

      </Modal.Body>

    </Modal >
  )
}

export default AdminModalEditarProducto
