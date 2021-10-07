import React, { useEffect, useState, Fragment } from 'react'
import { deleteProductoById, getProductos } from '../../../../services/productoService';
import { MDBDataTableV5 } from "mdbreact";
import AdminModalEditarProducto from '../../components/AdminModalEditarProducto';
import AdminModalCrearProducto from '../../components/AdminModalCrearProducto';
import Swal from "sweetalert2";

const AdminProductoScreen = () => {

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState({
    columns: [
      { label: '#', field: 'posicion', },
      { label: 'Id', field: 'producto_id', },
      { label: 'Nombre', field: 'producto_nom', },
      { label: 'Precio', field: 'producto_pre', },
      { label: 'Imagen', field: 'producto_img', },
      { label: 'Descripción', field: 'producto_des', },
      //{ label: 'Nro Mesa', field: 'mesa_nro', },
      //{ label: 'Capacidad', field: 'mesa_cap', },
      { label: 'Acciones', field: 'acciones' }
    ],
    rows: [],
  });
  const [objProductoEditar, setObjProductoEditar] = useState(null);

  const [mounted, setMounted] = useState(true);

  const eliminarProducto = producto_id => {
    Swal.fire({
      title: '¿Seguro que deseas eliminar el producto?',
      text: 'Los cambios serán irreversibles',
      showCancelButton: true,
      icon: 'error'
    }).then((rpta) => {
      if (rpta.isConfirmed) {
        deleteProductoById(producto_id).then(rpta => {
          if (rpta.data.ok) {
            Swal.fire({
              text: 'Producto eliminado correctamente',
              icon: 'success',
              timer: 1500
            })
            traerProductos();
          }
        })
      }
    })
  }

  const traerProductos = () => {
    setCargando(true);
    getProductos().then(rpta => {
      if (rpta.data.ok) {
        let productosFormateados = rpta.data.content.map((objProducto, i) => {
          return {
            ...objProducto,
            producto_id: objProducto.producto_id,
            producto_nom: objProducto.producto_nom,
            producto_pre: `S/ ${(+objProducto.producto_pre).toFixed(2)}`,
            producto_img: <img src={objProducto.producto_img} width="100" />,
            producto_des: objProducto.producto_des,

            //mesa_cap: objProducto.mesa_cap + " personas", //concatenación de string
            posicion: i + 1,
            acciones:
              <Fragment>
                <button className="btn btn-warning" onClick={() => {
                 setObjProductoEditar({ ...objProducto });
                 setMostrarModalEditar(true);
                }}>Editar</button>
                <button className="btn btn-danger" onClick={() => {
                  eliminarProducto(objProducto.producto_id)
                }}>
                 Eliminar
                </button>
              </Fragment>
          }
        })


        if (mounted) {
          setProductos({ ...productos, rows: productosFormateados })
          setCargando(false);
        }

      }
    })
  }

  useEffect(() => {

    traerProductos();

    return () => {
      setMounted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Fragment>
      <main className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <button className="btn btn-primary" onClick={() => {
                  setMostrarModalCrear(true);
                }}>Crear Producto</button>
                <hr />
                {
                  cargando ?
                    <div className="alert alert-info">
                      Cargando
                  </div> :
                    <MDBDataTableV5 data={productos} />
                }
              </div>
            </div>
          </div>
        </div>
      </main>


      <AdminModalEditarProducto
        mostrarModalEditar={mostrarModalEditar}
        setMostrarModalEditar={setMostrarModalEditar}
        objProductoEditar={objProductoEditar}
        traerProductos={traerProductos}
      />
      <AdminModalCrearProducto
        mostrarModalCrear={mostrarModalCrear}
        setMostrarModalCrear={setMostrarModalCrear}
        traerProductos={traerProductos}
      />
    </Fragment>
  )
}

export default AdminProductoScreen
