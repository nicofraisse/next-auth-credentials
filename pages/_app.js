import { Provider } from 'next-auth/client'
import toast, { Toaster } from 'react-hot-toast'

import Layout from '../components/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <>
          <Component {...pageProps} />
          <Toaster position='bottom-right' />
        </>
      </Layout>
    </Provider>
  )
}

export default MyApp
