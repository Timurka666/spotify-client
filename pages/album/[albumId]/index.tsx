import AlbumComponent from "@/components/albumPage/album";
import TrackComponent from "@/components/albumPage/track";
import Layout from "@/components/layout";
import { useActions, useTypedSelector, wrapper } from "@/store";
import { musicApi, useGetAlbumQuery } from "@/store/api";
import { IAlbumRes } from "@/store/api/interfaces";
import { currentAlbumSlice } from "@/store/currentlyWatchedAlbum.slice";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next/types";

export default function Album(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const {id, author, coverPath, name, publisher, tracks} = useTypedSelector(state => state.watchedAlbum);
    return (
        <>
        <Layout title={`Album | ${name}`} />
            <div className="
            after:content-['']
            after:block
            after:w-[95%]
            after:h-[1px]
            after:bg-neutral-500
            after:mt-[2rem]
            after:mx-auto">
                <AlbumComponent
                id={id}
                publisher={publisher}
                name={name}
                cover={coverPath}
                author={author} />
            </div>
            <div className="
            mt-[2rem]
            flex
            flex-col
            gap-[2rem]
            ">
                {tracks.map((el, i) => (
                    <TrackComponent
                    key={i}
                    id={el.id}
                    name={el.name}
                    coverPath={el.coverPath}
                    filePath={el.filePath}
                    likes={el.likes}
                    />
                ))}
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const {albumId}: any = context.params;
        const album = await store.dispatch(musicApi.endpoints.getAlbum.initiate(albumId));
        store.dispatch(currentAlbumSlice.actions.pushAlbum(album.data as IAlbumRes));
        await Promise.all(store.dispatch(musicApi.util.getRunningQueriesThunk()));
        
        return {props: {}}
    }
);