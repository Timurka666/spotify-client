import { useActions } from "@/store";
import { useRegisterUserMutation } from "@/store/api";
import { useEffect, useState } from "react"

export default function RegisterForm() {
    const [regUser, {data: userData, isSuccess}] = useRegisterUserMutation();
    const {pushJwt, pushUser} = useActions();
    const [nickName, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const registerUser = async () => {
        await regUser({nickName, email, password});
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
            text-neutral-600">Sign up</h1>
            <input
            value={nickName}
            onChange={(e) => {setNickName(e.target.value)}}
            type="text"
            placeholder="Nickname"
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
            onClick={registerUser}
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
            >Sign up</button>
        </div>
    )
}