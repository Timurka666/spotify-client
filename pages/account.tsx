import Layout from "@/components/layout";
import { makeStore, wrapper } from "@/store";
import { musicApi } from "@/store/api";
import { IGetMe } from "@/store/api/interfaces";
import { UserSlice } from "@/store/user.slice";
import { getCookie } from "cookies-next";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

export default function Account(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout title="Home page">
            <div>{props.user.data?.nickName}</div>
        </Layout>
    )
}

/*export const getServerSideProps: GetServerSideProps = async (context) => {
    const jwt = getCookie('jwt', {req: context.req, res: context.res}) as string;
    const res = await fetch(`${process.env.baseUrl}/api/user/getMe`, {headers: {Authorization: jwt}});
    const data: IGetMe = await res.json();

    return {props: {data}}
}*/

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const jwt = getCookie('jwt', {req: context.req, res: context.res}) as string;
        const user = await store.dispatch(musicApi.endpoints.getMe.initiate(jwt));
        await Promise.all(store.dispatch(musicApi.util.getRunningQueriesThunk()));
        store.dispatch(UserSlice.actions.pushUser({id: user.data?.id, nickName: user.data?.nickName, email: user.data?.email}))
        


        return {
            props: {user}
        }
    }
)