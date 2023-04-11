import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@/styles/globals.css'
import {Provider} from 'react-redux';
import { persistor, wrapper } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/lib/persistStore';

export default function MyApp({ Component, ...rest }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);
  const {pageProps} = props;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <>
          <NextNProgress color='#84cc16' options={{showSpinner: false}}  />
          <Component {...pageProps} />
        </>
      </PersistGate>
    </Provider>
  )
}