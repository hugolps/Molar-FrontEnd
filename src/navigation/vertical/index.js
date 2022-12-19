// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Logout from 'mdi-material-ui/Logout'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

export const navigation = () => {
  return [
    {
      title: 'Meus Imoveis',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Usuário',
      icon: AccountCogOutline,
      path: '/account-settings'
    },

    {
      title: 'Catálogo Imoveis ',
      icon: CubeOutline,
      path: '/catalogo-imoveis'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      //openInNewTab: true
    },

    // {
    //   title: 'Logout',
    //   icon: Logout,
    //   path: '/pages/login',
    //   openInNewTab: true
    // }

    // {
    //   sectionTitle: 'Pages'
    // },

    // {
    //   title: 'Matches',
    //   icon: AlertCircleOutline,
    //   path: '/matches',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },

    // // {
    // //   sectionTitle: 'User Interface'
    // // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   icon: GoogleCirclesExtended,
    //   path: '/icons'
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   title: 'Form Layouts',
    //   icon: CubeOutline,
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
