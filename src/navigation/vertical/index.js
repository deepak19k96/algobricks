// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Orders',
      icon: AccountPlusOutline,
      path: '/pages/orders',
      openInNewTab: false
    },
    {
      title: 'Users',
      icon: AccountPlusOutline,
      path: '/pages/users',
      openInNewTab: false
    },
    {
      title: 'Import Users',
      icon: AccountPlusOutline,
      path: '/pages/importusers',
      openInNewTab: false
    }
  ]
}

export default navigation
