import employee, { EmployeeState } from './employee'
import general, { GeneralState } from './general'
import recruitment, { RecruitmentState } from './recruitment/recruitment'
import user, { UserState } from './user'

export interface StoreState {
  general: GeneralState
  user: UserState
  employee: EmployeeState
  recruitment: RecruitmentState
}

const reducers = {
  general,
  employee,
  user,
  recruitment,
}

export default reducers
