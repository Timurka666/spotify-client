import AlbumComponent from "@/components/albumPage/album";
import Layout from "@/components/layout";
import { wrapper } from "@/store";
import { musicApi } from "@/store/api";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next/types";

export default function Album(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout title={`Album | ${props.album.data?.name}`}>
            <div className="
            after:content-['']
            after:block
            after:w-[95%]
            after:h-[1px]
            after:bg-neutral-500
            after:mt-[2rem]
            after:mx-auto">
                <AlbumComponent
                id={props.album.data?.id}
                publisher={props.album.data?.publisher}
                name={props.album.data?.name}
                cover={props.album.data?.coverPath}
                author={props.album.data?.author} />
            </div>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const {albumId} = context.params;
        const album = await store.dispatch(musicApi.endpoints.getAlbum.initiate(albumId));
        await Promise.all(store.dispatch(musicApi.util.getRunningQueriesThunk()));

        return {
            props: {album}
        }
    }
);