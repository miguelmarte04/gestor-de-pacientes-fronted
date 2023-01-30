import { UserType } from './types'
import userReducer, { authenticateUser, userSlice, UserState } from './user'

const { setUser, setIsLoggedIn } = userSlice.actions

export { authenticateUser, setUser, setIsLoggedIn }

export type { UserType, UserState }

export default userReducer
