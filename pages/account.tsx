import Layout from "@/components/layout";
import { makeStore, useTypedSelector, wrapper } from "@/store";
import { musicApi } from "@/store/api";
import { IGetMe } from "@/store/api/interfaces";
import { UserSlice } from "@/store/user.slice";
import { getCookie } from "cookies-next";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

export default function Account(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {id, nickName, email} = useTypedSelector((state) => state.user);

    return (
        <Layout title="My account">
            <div className="
            w-[60%]
            px-[1rem]
            py-[0.2rem]
            border-solid
            border-[2px]
            rounded-[10px]
            border-lime-400">
                <div className="
                text-5xl
                font-bold
                text-neutral-500">{props.user.data?.nickName}</div>
                <div className="
                text-2xl
                text-neutral-500">{props.user.data?.email}</div>
            </div>
            <div className="
            mt-[1rem]
            w-[60%]
            px-[1rem]
            py-[0.2rem]
            border-solid
            border-[2px]
            rounded-[10px]
            border-lime-400">
                <div className="
                text-5xl
                font-bold
                text-neutral-500">My albums</div>
                <div>
                    {props.user.data?.albums?.map((el, i) => (
                        <img src={`${process.env.baseUrl}/${el.coverPath}`} alt="" key={i} />
                    ))}
                </div>
                <Link href="/album/create"><button
                className="
                block
                text-lime-400
                text-xl
                font-bold
                align-middle
                text-center
                w-auto
                px-[0.5rem]
                py-[0.2rem]
                border-lime-400
                border-[2px]
                rounded-[10px]
                hover:border-neutral-800
                hover:bg-lime-400
                hover:text-neutral-800
                transition-all
                ">
                    Add new album
                </button></Link>
            </div>
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