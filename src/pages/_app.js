// pages/_app.js
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
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

const PUBLIC_ROUTES = ['/pages/login', '/pages/forgotpassword', '/pages/termsofuse', '/blockeduser']

// Global component to fetch user details and check user status
const FetchUserDetail = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const routerRef = useRef(router)
  routerRef.current = router

  const hasFetchedRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (hasFetchedRef.current) return

    const token = localStorage.getItem('accessToken')
    const userStr = localStorage.getItem('user')
    if (!token || !userStr) return

    hasFetchedRef.current = true

    dispatch(fetchUserData())
      .unwrap()
      .then(data => {
        if (data?.user?.Status === 'Blocked') {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('user')
          routerRef.current.push('/blockeduser')
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        if (!PUBLIC_ROUTES.includes(routerRef.current.pathname)) {
          routerRef.current.push('/pages/login')
        }
      })
  }, [dispatch])

  return null
}

const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('user')
    let parsedUser = null
    try {
      parsedUser = typeof user === 'string' ? JSON.parse(user) : user
    } catch (e) {
      parsedUser = null
    }
    if ((!token || !parsedUser?.Email) && !PUBLIC_ROUTES.includes(router.pathname)) {
      router.push('/pages/login')
    }
  }, [router.pathname])

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
