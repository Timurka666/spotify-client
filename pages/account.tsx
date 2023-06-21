/* eslint-disable @next/next/no-img-element */
import AlbumComponent from "@/components/account/album";
import Layout from "@/components/layout";
import { actions, makeStore, useTypedSelector, wrapper } from "@/store";
import { MyAlbumsSlice } from "@/store/album.slice";
import { musicApi } from "@/store/api";
import { UserSlice } from "@/store/user.slice";
import { getCookie } from "cookies-next";
import { cloneDeep } from "lodash";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";

export default function Account(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    wrapper.useHydration(props);
    const {id, nickName, email} = useTypedSelector((state) => state.user);
    const {myAlbums} = useTypedSelector((state) => state.myAlbums);

    return (
        <>
        <Layout title="My account" />
            <div className="
            w-[60%]
            px-[1rem]
            py-[0.5rem]
            border-solid
            border-[2px]
            rounded-[10px]
            border-lime-400">
                <div className="
                text-5xl
                font-bold
                text-neutral-500">{nickName}</div>
                <div className="
                text-2xl
                text-neutral-500">{email}</div>
            </div>
            <div className="
            mt-[1rem]
            w-[50%]
            px-[1rem]
            py-[0.5rem]
            border-solid
            border-[2px]
            rounded-[10px]
            border-lime-400">
                <div className="
                flex
                justify-between
                ">
                    <div className="
                    text-5xl
                    font-bold
                    text-neutral-500">My albums</div>
                    <Link href="/album/create"><button
                    className="
                    mt-[1rem]
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
                <div className="
                mt-[1rem]
                flex
                flex-col
                gap-[1rem]
                ">
                    {myAlbums.map((el, i) => (
                        <AlbumComponent
                        albumId={el.id}
                        imagePath={el.coverPath}
                        albumName={el.name}
                        albumAuthor={el.author}
                        key={i}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

/*export const getServerSideProps: GetServerSideProps = async (context) => {
    const jwt = getCookie('jwt', {req: context.req, res: context.res}) as string;
    const res = await fetch(`${process.env.baseUrl}/api/user/getMe`, {headers: {Authorization: jwt}});
    const data: IGetMe = await res.json();

    return {props: {data}}
}*/

export const getServerSideProps = wrapper.getServerSideProps(
    store => async context => {
        const jwt = getCookie('jwt', {req: context.req, res: context.res}) as string;

        store.dispatch(musicApi.endpoints.getMe.initiate(jwt));

        await Promise.all(store.dispatch(musicApi.util.getRunningQueriesThunk()));

        return {
            props: {}
        }
    }
)