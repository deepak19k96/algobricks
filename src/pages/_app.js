// pages/_app.js
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store } from '../store'
import NProgress from 'nprogress'
import { CacheProvider } from '@emotion/react'
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import Snackbar from 'src/@core/components/snackbar'
import GlobalLoader from 'src/@core/components/GlobalLoader/GlobalLoader'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { UserProfileProvider } from 'src/@core/context/UserProfileContext'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../../styles/globals.css'
import { fetchUserData } from 'src/store/userDataSlice'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader using NProgress (if enabled in your themeConfig)
if (themeConfig.routingLoader) {
  NProgress.configure({ showSpinner: false })
}

// Global component to fetch user details and check user status
const FetchUserDetail = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    // Only fetch if a token exists (i.e. user is logged in)
    if (typeof window !== 'undefined' && localStorage.getItem('accessToken') && localStorage.getItem('user')) {
      dispatch(fetchUserData())
        .unwrap()
        .then(data => {
          if (data.user.Status === 'Blocked') {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
            router.push('/blockeduser')
          }
        })
        .catch(error => {
          router.push('/pages/login')
          console.error('Error fetching user data:', error)
        })
    }
  }, [dispatch, router])

  return null
}

const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')
      const user = localStorage.getItem('user')
      const parsedUser = typeof user === 'string' ? JSON.parse(user) : user
      const publicRoutes = ['/pages/login', '/pages/forgotpassword', '/pages/termsofuse', '/blockeduser']
      if ((!token || !parsedUser?.Email) && !publicRoutes.includes(router.pathname)) {
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
        <title>{`${themeConfig.templateName}`}</title>
        <meta name='description' content={`${themeConfig.templateName} – Portal for google wallet and bot.`} />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Provider store={store}>
        {/* Fetch global user details and check if blocked */}
        <FetchUserDetail />
        <Snackbar />
        <SettingsProvider>
          <UserProfileProvider>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
              )}
            </SettingsConsumer>
          </UserProfileProvider>
        </SettingsProvider>
      </Provider>
    </CacheProvider>
  )
}

export default App
