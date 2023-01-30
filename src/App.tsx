import { ThemeProvider } from 'styled-components'
import { ConfigProvider } from 'antd'
import { defaultTheme } from './themes'
import Spanish from 'antd/lib/locale/es_ES'
import { Provider } from 'react-redux'
import store from './app/store'
import Routes from './routes'
import ErrorBoundary from './ErrorBoundary'
import { AnyType } from './constants/types'

const ErrorCatcher = ErrorBoundary as AnyType

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <ConfigProvider locale={Spanish}>
          <ErrorCatcher>
            <Routes />
          </ErrorCatcher>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
