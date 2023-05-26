import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@/styles/globals.css'
import {Provider} from 'react-redux';
import { wrapper } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/lib/persistStore';
import MainLayout from '@/components/mainLayout';

export default function MyApp({ Component, ...rest }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);
  const {pageProps} = props;
  //const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)} loading={null}>
          <NextNProgress color='#84cc16' options={{showSpinner: false}}  />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
      </PersistGate>
    </Provider>
  )
}