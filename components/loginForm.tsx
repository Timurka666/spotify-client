import { useActions } from "@/store";
import { useLoginUserMutation } from "@/store/api";
import { useEffect, useState } from "react"
import {useRouter} from 'next/navigation';

export default function LoginForm() {
    const {push} = useRouter();
    const [logUser, {data: userData, isSuccess}] = useLoginUserMutation();
    const {pushJwt, pushUser} = useActions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

   const loginUser = async () => {
        await logUser({email, password});
        if (!userData || isSuccess) {
            return setMessage('something went wrong');
        }
    }

    useEffect(() => {
        if (userData && isSuccess) {
            pushUser({
                id: userData?.user.id,
                email: userData?.user.email,
                nickName: userData?.user.nickName
            })
            pushJwt(userData?.token);
            push('/account');
        }
    }, [isSuccess])

    return (
        <div className="
        mx-auto
        border-solid
        border-lime-400
        border-[3px]
        rounded-[10px]
        w-[25rem]
        p-[1rem]
        flex
        flex-col
        gap-[1rem]">
            <h1 className="
            text-xl
            font-bold
            text-neutral-500">Sign in</h1>
            <input
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            type="email"
            placeholder="email"
            className="
            bg-white/0
            h-[2.3rem]
            border-solid
            border-[2px]
            rounded-[5px]
            border-neutral-600
            text-neutral-300
            px-[0.5rem]"
             />
            <input
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            type="password"
            placeholder="password"
            className="
            bg-white/0
            h-[2.3rem]
            border-solid
            border-[2px]
            rounded-[5px]
            border-neutral-600
            text-neutral-300
            px-[0.5rem]"
             />
            <button
            onClick={loginUser}
            className="
            text-lime-400
            text-xl
            font-bold
            align-middle
            text-center
            w-auto
            px-[0.5rem]
            py-[0.2rem]
            border-solid
            border-lime-400
            border-[2px]
            rounded-[10px]
            hover:border-neutral-800
            hover:bg-lime-400
            hover:text-neutral-800
            transition-all
            "
            >Sign in</button>
        </div>
    )
}