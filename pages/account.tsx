import Layout from "@/components/layout";
import { musicApi } from "@/store/api";
import { IGetMe } from "@/store/api/interfaces";
import { getCookie } from "cookies-next";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

export default function Account(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout title="Home page">
            <div>{props.data.nickName}</div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const jwt = getCookie('jwt', {req: context.req, res: context.res}) as string;
    const res = await fetch(`${process.env.baseUrl}/api/user/getMe`, {headers: {Authorization: jwt}});
    const data: IGetMe = await res.json();

    return {props: {data}}
}