import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthenticateUserPayload, userApiHelper } from '../../utils/apis'
import { showNotification } from '../../utils/general'
import { createSession } from '../../utils/session'
import { UserType } from './types'

export interface UserState {
  user: UserType
  fetchingUserData: boolean
  isLoggedIn: boolean
}

const initialState: UserState = {
  fetchingUserData: false,
  isLoggedIn: false,
  user: {},
}

export const authenticateUser = createAsyncThunk(
  'user/authenticateUser',
  async (user: AuthenticateUserPayload) => {
    {
      const response = await userApiHelper.authenticateUser(user)

      const { data } = response.data

      createSession(data)
      return data
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.fetchingUserData = true
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.fetchingUserData = false
        state.isLoggedIn = true
        state.user = action.payload
      })
      .addCase(authenticateUser.rejected, (state) => {
        state.fetchingUserData = false
        state.isLoggedIn = false
        showNotification({
          type: 'error',
          description: 'Contraseña o usuario incorrecto',
          title: 'Error',
        })
      })
  },
})

export default userSlice?.reducer
