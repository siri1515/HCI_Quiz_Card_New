import { AppProvider } from '../context/AppContext';

function MyApp({ Component, pageProps }) {


  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
