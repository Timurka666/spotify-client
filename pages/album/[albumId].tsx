import AlbumComponent from "@/components/albumPage/album";
import Layout from "@/components/layout";
import { wrapper } from "@/store";
import { musicApi } from "@/store/api";
import { InferGetServerSidePropsType } from "next/types";

export default function Album(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout title={`Album | ${props.album.data?.name}`}>
            <AlbumComponent publisher={props.album.data?.publisher} name={props.album.data?.name} cover={props.album.data?.coverPath} author={props.album.data?.author} />
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