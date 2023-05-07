import Layout from "@/components/layout";
import LoginForm from "@/components/loginForm";

export default function Login() {
    return (
        <>
        <Layout title="Sign in" />
            <div className="
            mt-[7rem]">
            <LoginForm />
            </div>
        </>
    )
}