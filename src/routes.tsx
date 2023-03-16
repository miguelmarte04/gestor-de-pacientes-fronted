import React from 'react'
import Login from './pages/Login'
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from 'react-router-dom'
import {
  PATH_ADMINISTRADORES,
  PATH_CONSULTAS,
  PATH_CONSULTAS_DOCTORES,
  PATH_CONSULTAS_PACIENTES,
  PATH_DOCTORES,
  PATH_ESPECIALIDADES,
  PATH_HISTORIAL_CONSULTAS,
  PATH_HISTORIAL_DOCTORES,
  PATH_HISTORIAL_PACIENTES,
  PATH_HORARIOS,
  PATH_LOGIN,
  PATH_MAIN,
  PATH_PACIENTES,
  PATH_PACIENTES_DOCTORES,
  PATH_PROFILE,
} from './constants/Routes'
import MenuRoutesWrapper from './components/MenuRoutesWrapper'
import { isLoggedIn } from './utils/session'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import SimpleTemplate from './pages/SimpleTemplate'

const LoginRequired = (): React.ReactElement =>
  isLoggedIn() ? <Outlet /> : <Navigate to={PATH_LOGIN} />

const Routes = (): React.ReactElement => {
  return (
    <Router>
      <Switch>
        <Route path={PATH_LOGIN} element={<Login />} />
        <Route element={<LoginRequired />}>
          <Route path={'/'} element={<MenuRoutesWrapper />}>
            <Route path={PATH_MAIN} element={<Dashboard />} />
            <Route path={PATH_PROFILE} element={<Profile />} />
            <Route
              path={PATH_CONSULTAS}
              element={<SimpleTemplate State={'C'} />}
            />
            <Route
              path={PATH_CONSULTAS_PACIENTES}
              element={<SimpleTemplate State={'CP'} />}
            />
            <Route
              path={PATH_HISTORIAL_CONSULTAS}
              element={<SimpleTemplate State={'HC'} />}
            />
            <Route
              path={PATH_CONSULTAS_DOCTORES}
              element={<SimpleTemplate State={'CD'} />}
            />
            <Route
              path={PATH_HISTORIAL_DOCTORES}
              element={<SimpleTemplate State={'HD'} />}
            />
            <Route
              path={PATH_HISTORIAL_PACIENTES}
              element={<SimpleTemplate State={'HP'} />}
            />
            <Route
              path={PATH_PACIENTES}
              element={<SimpleTemplate State={'P'} />}
            />
            <Route
              path={PATH_PACIENTES_DOCTORES}
              element={<SimpleTemplate State={'PD'} />}
            />
            <Route
              path={PATH_DOCTORES}
              element={<SimpleTemplate State={'D'} />}
            />
            <Route
              path={PATH_ESPECIALIDADES}
              element={<SimpleTemplate State={'E'} />}
            />
            <Route
              path={PATH_HORARIOS}
              element={<SimpleTemplate State={'H'} />}
            />
            <Route
              path={PATH_ADMINISTRADORES}
              element={<SimpleTemplate State={'A'} />}
            />
            <Route path={'*'} element={<NotFound />} />
          </Route>
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
