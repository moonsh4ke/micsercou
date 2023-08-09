import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/Header.jsx'

export default function AppComponent({Component, pageProps, currentUser}) {
  return (
    <>
      <Header currentUser={currentUser}/>
      <Component {...pageProps}/>
    </>
  )
}

AppComponent.getInitialProps = async function(app) {
  const client = buildClient(app.ctx);
  const {data} = await client.get('api/users/currentuser');
  let pageProps = {}
  if(app.Component.getInitialProps) {
    pageProps = app.Component.getInitialProps(app.ctx);
  }
  return {
    pageProps,
    ...data
  }
}
