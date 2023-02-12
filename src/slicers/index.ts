import general, { GeneralState } from './general'
import user, { UserState } from './user'

export interface StoreState {
  general: GeneralState
  user: UserState
}

const reducers = {
  general,
  user,
}

export default reducers
