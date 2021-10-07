import React from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom"
import AdminHeader from './components/AdminHeader'
import AdminDashboardScreen from './pages/dashboard/AdminDashboardScreen'
import AdminMesaScreen from './pages/mesa/AdminMesaScreen'
import AdminPedidoScreen from './pages/pedido/AdminPedidoScreen'
import AdminPlatoCrearScreen from './pages/plato/AdminPlatoCrearScreen'
import AdminPlatoScreen from './pages/plato/AdminPlatoScreen'
import AdminProductoScreen from './pages/productos/AdminProductoScreen'

const AdminRouter = () => {
  return (
    <div>
      <AdminHeader />
      <Switch>
        <Route path="/admin/mesa">
          <AdminMesaScreen />
        </Route>
        <Route path="/admin/plato/crear">
          <AdminPlatoCrearScreen />
        </Route>
        <Route path="/admin/plato">
          <AdminPlatoScreen />
        </Route>
        <Route path="/admin/pedido">
          <AdminPedidoScreen />
        </Route>
        <Route path="/admin/producto">
          <AdminProductoScreen />
        </Route>
        <Route path="/admin" exact>
          <AdminProductoScreen />
        </Route>
      </Switch>
    </div>
  )
}

export default AdminRouter
