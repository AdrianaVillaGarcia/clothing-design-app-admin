import axios from "axios";

import { URL_BACKEND } from "../environments/environments";


//PRODUCTOS no es igual a Producto
export const getProductos = async () => {   //getMesas
  const rpta = await axios.get(`${URL_BACKEND}/producto`); //mesa
  return rpta
}

export const putProductoById = async (objProducto) => { //putMesaById (objMesa)

  const rpta = await axios.put(
    `${URL_BACKEND}/producto/${objProducto.producto_id}`,
    JSON.stringify(objProducto),
    {
      headers: {
        "Content-type": "application/json"
      }
    }
  )
  return rpta;

}

export const postProducto = async (objProducto) => {
  const rpta = axios.post(
    `${URL_BACKEND}/producto`,
    JSON.stringify(objProducto),
    {
      headers: {
        "Content-type": "application/json"
      }
    }
  );
  return rpta;
}


export const postUploadImagenByProductoId = async (file, producto_id) => {

    let miFormData = new FormData();
    miFormData.append("imagen", file);
    miFormData.append("producto_id", producto_id);
  
    const rpta = await axios.post(
      `${URL_BACKEND}/producto/imagen/upload`,
      miFormData,
      {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    );
    return rpta;
  
}

export const deleteProductoById = async (producto_id) => {
  const rpta = await axios.delete(`${URL_BACKEND}/producto/${producto_id}`);
  return rpta;
}
