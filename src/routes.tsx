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
  PATH_CONSULTAS,
  PATH_LOGIN,
  PATH_MAIN,
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
            <Route path={'*'} element={<NotFound />} />
          </Route>
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
