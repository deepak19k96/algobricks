// pages/_app.js
import Head from 'next/head'
import { useRouter } from 'next/router' // Import useRouter
import { useEffect } from 'react'

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from '../store'

// ** Loader Import (NProgress)
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import Snackbar from 'src/@core/components/snackbar'
import GlobalLoader from 'src/@core/components/GlobalLoader/GlobalLoader' // Global loader import

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { UserProfileProvider } from 'src/@core/context/UserProfileContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader using NProgress (if enabled in your themeConfig)
if (themeConfig.routingLoader) {
  NProgress.configure({ showSpinner: false })
}

const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')
      const publicRoutes = ['/pages/login', '/pages/forgotpassword', '/pages/termsofuse']
      if (!token && !publicRoutes.includes(router.pathname)) {
        router.push('/pages/login')
      }
    }
  }, [router.pathname, router])

  if (!Component) {
    return null
  }

  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Portal`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Portal for google wallet and bot.`}
        />
        <meta
          name='keywords'
          content='Material Design, MUI, Admin Template, React Admin Template'
        />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Provider store={store}>
        <Snackbar />
        <SettingsProvider>
          <UserProfileProvider>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeComponent settings={settings}>
                  {/* <GlobalLoader /> */}
                  {getLayout(<Component {...pageProps} />)}
                </ThemeComponent>
              )}
            </SettingsConsumer>
          </UserProfileProvider>
        </SettingsProvider>
      </Provider>
    </CacheProvider>
  )
}

export default App
