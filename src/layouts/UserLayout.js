// UserLayout.js
import VerticalLayout from 'src/@core/layouts/VerticalLayout'
import VerticalNavItems from 'src/navigation/vertical'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import { useSettings } from 'src/@core/hooks/useSettings'
import useMediaQuery from '@mui/material/useMediaQuery'

const UserLayout = ({ children, pageTitle, showIcons = false }) => {
  const { settings, saveSettings } = useSettings()
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={VerticalNavItems()}
      verticalAppBarContent={props => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
          pageTitle={pageTitle}
          showIcons={showIcons} // <-- Pass the new prop here
        />
      )}
    >
      {children}
    </VerticalLayout>
  )
}

export default UserLayout
