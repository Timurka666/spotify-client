import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@/styles/globals.css'
import {Provider} from 'react-redux';
import { wrapper } from '@/store';
import MainLayout from '@/components/mainLayout';
import { getCookie } from 'cookies-next';
import { musicApi } from '@/store/api';
import App from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = wrapper.useStore();

  return (
    <Provider store={store}>
      <NextNProgress color='#84cc16' options={{showSpinner: false}}  />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (ctx) => {
    const jwt = getCookie('jwt', {req: ctx.ctx.req, res: ctx.ctx.res}) as string;
    const user = await store.dispatch(musicApi.endpoints.getMe.initiate(jwt));
    const childrenGip = await App.getInitialProps(ctx);
    return {
      pageProps: {
        ...childrenGip.pageProps,
        isAuthorized: user.isSuccess
      }
    }
  }
)