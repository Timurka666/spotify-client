/* eslint-disable react/jsx-no-undef */
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@/styles/globals.css'
import {Provider} from 'react-redux';
import { store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/lib/persistStore';
import MainLayout from '@/components/mainLayout';


export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <NextNProgress color='#84cc16' options={{showSpinner: false}}  />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </PersistGate>

    </Provider>
  )
}
