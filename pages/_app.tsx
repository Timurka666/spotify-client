import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import {Provider} from 'react-redux';
import { persistor, wrapper } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function MyApp({ Component, ...rest }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);
  const {pageProps} = props;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}