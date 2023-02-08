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
  APPROVE_LAYOFFS,
  APPROVE_REASIGNATIONS,
  APROBAR_NOMINA,
  APROBAR_SOLICITUD_VACACIONES,
  AUMENTO_SUELDO,
  AUTORIZAR_NOMINA,
  CAMBIAR_DEPARTAMENTO,
  CANDIDATES_HISTORY,
  CANDIDATES_PATH,
  CANDIDATES_REPORT,
  CARTA_REGISTRO_EMPLEADOS,
  CHANGE_HISTORY_DEPARTMENTS,
  CHANGE_HISTORY_FAULTS,
  CHANGE_HISTORY_LAYOFFS,
  CHANGE_HISTORY_REASIGNATIONS,
  CHECK_HOLIDAYS,
  CONSULTAR_NOMINA,
  EMPLOYEES,
  EMPLOYEES_BIRTHDAY,
  EMPLOYEES_HISTORY,
  GENERAR_CONTRATO,
  HISTORIAL_NOMINA,
  INFORME_DESPIDO,
  INFORME_FALTAS,
  INFORME_LICENCIA,
  INFORME_PERMISOS,
  INFORME_RENUNCIAS,
  INFORME_VACACIONES,
  PATH_LOGIN,
  PATH_MAIN,
  PATH_PROFILE,
  PERMIT_OR_LICENSE_CHANGE_HISTORY,
  RECORD_PERMIT_OR_LICENSE,
  REGISTER_EMPLOYEE,
  REGISTER_OR_MODIFY_CONFIGURATION,
  REGISTER_OR_MODIFY_DEPARTMENTS,
  REGISTER_OR_MODIFY_FAULTS,
  REGISTER_OR_MODIFY_LAYOFFS,
  REGISTER_OR_MODIFY_REASIGNATIONS,
  REGISTRAR_NOMINA,
  REPORTE_EMPLEADOS,
  REVERSAR_NOMINA,
  SOLICITAR_VACACIONES,
  TIPOS_NOMINA,
  USER_PERMISSIONS,
  VACANCIES_PATH,
  VACATIONS_CHANGE_HISTORY,
} from './constants/Routes'
import MenuRoutesWrapper from './components/MenuRoutesWrapper'
import {  isLoggedIn } from './utils/session'
import Employee from './pages/employee'
import RegisterEmployee from './pages/RegisterEmployee'
import Profile from './pages/Profile'
// import { styles } from './utils/general'
// import { InfoEmpresaType } from './slicers/general'
// import { useAppSelector } from './hooks'
import ChangeHistory from './pages/ChangeHistory'
import PermitOrLicense from './pages/PermitOrLicense'
import Holidays from './pages/Holidays'
import Birthday from './pages/Birthday'
import NotFound from './pages/NotFound'
import Faults from './pages/Faults'
import Layoffs from './pages/Layoffs'
import ApproveLayoffs from './pages/ApproveLayoffs'
import Resignations from './pages/Resignations'
import ApproveResignations from './pages/ApproveResignations'
import Departaments from './pages/Departaments'
import HistoryChangeFaults from './pages/HistoryChangeFaults'
import HistoryChangeVacations from './pages/HistoryChangeVacations'
import ChangeHistoryPermissionsOrLicenses from './pages/ChangeHistoryPermissionsOrLicenses'
import HistoryChangeLayoffs from './pages/HistoryChangeLayoffs'
import HistoryChangeReasignations from './pages/HistoryChangeReasignations'
import HistoryChangeDepartaments from './pages/HistoryChangeDepartaments'
import AumentoSueldo from './pages/AumentoSueldo'
import CambiarDepartamento from './pages/CambiarDepartamento'
import GenerarContrato from './pages/GenerarContrato'
import RegistrarNomina from './pages/RegistrarNomina'
import AprobarNomina from './pages/AprobarNomina'
import AutorizarNomina from './pages/AutorizarNomina'
import ConsultarNomina from './pages/ConsultarNomina'
import ReversarNomina from './pages/ReversarNomina'
import TipoNomina from './pages/TipoNomina'
import NominaHistorial from './pages/NominaHistorial'
import SolicitarVacaciones from './pages/SolicitarVacaciones'
import AprobarVacaciones from './pages/AprobarVacaciones'
import Vacancy from './pages/Vacancy'
import Candidates from './pages/Candidates'
import Dashboard from './pages/Dashboard'
import HistorialVacantes from './pages/HistorialVacantes'
import CartaRegistroEmpleado from './components/CartaRegistroEmpleado'
import Sueldos from './pages/Sueldos'
import Candidatos from './pages/Candidatos'
import Licencias from './pages/Licencias'
import Permisos from './pages/Permisos'
import Vacaciones from './pages/Vacaciones'
import Faltas from './pages/Faltas'
import Despidos from './pages/Despidos'
import Renuncias from './pages/Renuncias'
import Configurations from './pages/Configurations'
import UserPermissions from './pages/UserPermissions'

const LoginRequired = (): React.ReactElement =>
  isLoggedIn() ? <Outlet /> : <Navigate to={PATH_LOGIN} />

const Routes = (): React.ReactElement => {
  // const { infoEmpresa: InfoEmpresa } = useAppSelector((state) => state.general)
  // const [getDataEmpresa, setGetDataEmpresa] = useState<InfoEmpresaType>()

  // const callback = useCallback(() => {
  //   if (getDataInfoEmpresa()?.id && !getDataEmpresa?.id) {
  //     setGetDataEmpresa(getDataInfoEmpresa())
  //   }
  // }, [InfoEmpresa])

  // useEffect(callback, [callback])

  return (
    <>
      {/* <style>{styles(getDataInfoEmpresa()?.background_color)}</style> */}
      <Router>
        <Switch>
          <Route path={PATH_LOGIN} element={<Login />} />
          <Route element={<LoginRequired />}>
            <Route path={'/'} element={<MenuRoutesWrapper />}>
              <Route path={PATH_MAIN} element={<Dashboard />} />
              <Route path={EMPLOYEES} element={<Employee />} />
              <Route path={GENERAR_CONTRATO} element={<GenerarContrato />} />
              <Route path={CHECK_HOLIDAYS} element={<Holidays />} />
              <Route
                path={SOLICITAR_VACACIONES}
                element={<SolicitarVacaciones />}
              />
              <Route
                path={APROBAR_SOLICITUD_VACACIONES}
                element={<AprobarVacaciones />}
              />
              <Route
                path={CANDIDATES_HISTORY}
                element={<HistorialVacantes />}
              />
              <Route path={EMPLOYEES_BIRTHDAY} element={<Birthday />} />
              <Route path={HISTORIAL_NOMINA} element={<NominaHistorial />} />
              <Route
                path={CAMBIAR_DEPARTAMENTO}
                element={<CambiarDepartamento />}
              />
              <Route path={AUTORIZAR_NOMINA} element={<AutorizarNomina />} />
              <Route path={TIPOS_NOMINA} element={<TipoNomina />} />
              <Route path={CONSULTAR_NOMINA} element={<ConsultarNomina />} />
              <Route path={REVERSAR_NOMINA} element={<ReversarNomina />} />
              <Route path={APROBAR_NOMINA} element={<AprobarNomina />} />
              <Route
                path={RECORD_PERMIT_OR_LICENSE}
                element={<PermitOrLicense />}
              />
              <Route path={PATH_PROFILE} element={<Profile />} />
              <Route path={EMPLOYEES_HISTORY} element={<ChangeHistory />} />
              <Route path={REGISTRAR_NOMINA} element={<RegistrarNomina />} />
              <Route path={AUMENTO_SUELDO} element={<AumentoSueldo />} />
              <Route path={INFORME_DESPIDO} element={<Despidos />} />
              <Route path={REGISTER_EMPLOYEE} element={<RegisterEmployee />} />
              <Route path={CANDIDATES_REPORT} element={<Candidatos />} />
              <Route path={INFORME_LICENCIA} element={<Licencias />} />
              <Route path={INFORME_PERMISOS} element={<Permisos />} />
              <Route path={REPORTE_EMPLEADOS} element={<Sueldos />} />
              <Route path={INFORME_VACACIONES} element={<Vacaciones />} />
              <Route path={INFORME_FALTAS} element={<Faltas />} />
              <Route
                path={CARTA_REGISTRO_EMPLEADOS}
                element={<CartaRegistroEmpleado />}
              />
              <Route path={REGISTER_OR_MODIFY_FAULTS} element={<Faults />} />
              <Route path={REGISTER_OR_MODIFY_LAYOFFS} element={<Layoffs />} />
              <Route path={APPROVE_LAYOFFS} element={<ApproveLayoffs />} />
              <Route
                path={REGISTER_OR_MODIFY_REASIGNATIONS}
                element={<Resignations />}
              />

              <Route
                path={APPROVE_REASIGNATIONS}
                element={<ApproveResignations />}
              />
              <Route path={INFORME_RENUNCIAS} element={<Renuncias />} />
              <Route
                path={REGISTER_OR_MODIFY_DEPARTMENTS}
                element={<Departaments />}
              />
              <Route
                path={CHANGE_HISTORY_FAULTS}
                element={<HistoryChangeFaults />}
              />
              <Route
                path={VACATIONS_CHANGE_HISTORY}
                element={<HistoryChangeVacations />}
              />
              <Route
                path={CHANGE_HISTORY_LAYOFFS}
                element={<HistoryChangeLayoffs />}
              />
              <Route
                path={CHANGE_HISTORY_REASIGNATIONS}
                element={<HistoryChangeReasignations />}
              />
              <Route
                path={CHANGE_HISTORY_DEPARTMENTS}
                element={<HistoryChangeDepartaments />}
              />
              <Route
                path={PERMIT_OR_LICENSE_CHANGE_HISTORY}
                element={<ChangeHistoryPermissionsOrLicenses />}
              />
              <Route path={VACANCIES_PATH} element={<Vacancy />} />
              <Route path={CANDIDATES_PATH} element={<Candidates />} />
              <Route
                path={REGISTER_OR_MODIFY_CONFIGURATION}
                element={<Configurations />}
              />
              <Route path={USER_PERMISSIONS} element={<UserPermissions />} />
              <Route path={'*'} element={<NotFound />} />
            </Route>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default Routes
