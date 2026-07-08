import { ArrowRight, ArrowLeft, Lock, Mail, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import type { RegisterData } from '../types/api';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
const Register = () => {
    const { t, i18n } = useTranslation();
    const { register } = useAuth();
    const [registerData, setRegisterData] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(registerData)
        register.mutate(registerData)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-ui-surfaceContainer border-ui-outline rounded-xl border w-3/4 mx-auto p-6 md:p-12 lg:w-2/5">

            <div className="flex flex-col w-full">
                <h1 className="font-bold md:text-2xl text-ui-primaryText">{t("Sign Up for a new account")}</h1>
                <p className="text-ui-primaryText">{t("Enter your details to create an account.")}</p>
            </div>

            <div className="flex flex-col w-full">
                <label className="text-ui-primaryText" htmlFor="name">{t("Username")}</label>
                <div className="relative w-full">
                    <User className="text-ui-primaryText absolute inset-s-3 top-1/2 h-5 w-5 -translate-y-1/2 pointer-events-none" />
                    <input value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} className="w-full text-ui-primaryText border-ui-outline border rounded-md py-2 ps-10 pe-3" id="name" type="text" />
                </div>
            </div>

            <div className="flex flex-col w-full">
                <label className="text-ui-primaryText" htmlFor="email">{t("Email Address")}</label>
                <div className="relative w-full">
                    <Mail className="text-ui-primaryText absolute inset-s-3 top-1/2 h-5 w-5 -translate-y-1/2 pointer-events-none" />
                    <input value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} className="w-full text-ui-primaryText border-ui-outline border rounded-md py-2 ps-10 pe-3" id="email" type="text" />
                </div>
            </div>

            <div className="flex flex-col w-full">
                <label className="text-ui-primaryText" htmlFor="password">{t("Password")}</label>
                <div className="relative w-full">
                    <Lock className="text-ui-primaryText absolute inset-s-3 top-1/2 h-5 w-5 -translate-y-1/2 pointer-events-none" />
                    <input value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} className="w-full text-ui-primaryText border-ui-outline border rounded-md py-2 ps-10 pe-3" id="password" type="password" />
                </div>
            </div>

            <button className="w-full cursor-pointer bg-ui-primary text-ui-insidePrimaryText font-semibold py-1 rounded flex justify-center items-center" type="submit">
                {register.isPending ? t("Loading...") : t("Sign Up")}
                {i18n.language === "en" ? <ArrowRight className=" ms-2" /> : <ArrowLeft className=" ms-2" />}
            </button>

            <div className="flex flex-col w-full items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-24 h-px bg-ui-outline"></div>
                    <p className="text-ui-primaryText whitespace-nowrap">{t("Or continue with")}</p>
                    <div className="w-24 h-px bg-ui-outline"></div>
                </div>

                <div className="flex items-center justify-center gap-4 w-full">
                    <button disabled className="bg-gray-300 cursor-not-allowed border-ui-outline border rounded-md p-2 w-1/2">Google</button>
                    <button disabled className="bg-gray-300 cursor-not-allowed border-ui-outline border rounded-md p-2 w-1/2">Github</button>
                </div>
            </div>
            <div className="flex w-full justify-center">
                <p className="text-ui-primaryText">{t("Already has an account?")} <NavLink className="text-ui-primary" to="/login">{t("Login now")}</NavLink></p>
            </div>
        </form>
    );
}

export default Register;