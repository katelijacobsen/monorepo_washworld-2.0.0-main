'use client';

import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";



export default function Form() {
    const [toggle, setToggle] = useState<"login" | "signup" | "forgotPassword">("login");

    return toggle === "login"
    ? <LoginForm onToggleSignup={() => setToggle("signup")} onForgotPassword={() => setToggle("forgotPassword")}/>
    : toggle === "signup"
    ? <SignupForm onToggleLogin={() => setToggle("login")} />
    : <ForgotPasswordForm onToggleLogin={() => setToggle("login")} onToggleSignup={() => setToggle('signup')}/>
}