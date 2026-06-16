"use client";

import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
import { useState } from "react";
// custom hook
import { useForgotPassword } from "../hooks/useForgotPassword";

type Props = { onToggleLogin: () => void, onToggleSignup: () => void  };

export default function ForgotPasswordForm({ onToggleLogin, onToggleSignup }: Props) {
  // useState
  const [forgotPassword, setForgetPassword] = useState("");
  // custom hook useLogin
  const signupMutation = useForgotPassword();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    //smid custom hook ind i submit funktionen
    signupMutation.mutate({
      user_email: forgotPassword,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Forgot Password</legend>
          <Input
            type="text"
            name="forgot_password"
            label="Email"
            inputLabel="Email"
            value={forgotPassword}
            onChange={setForgetPassword}
          />
        </fieldset>
        {signupMutation.isError && <p style={{ color: "red" }}>nopes</p>}
        {signupMutation.isSuccess && <p style={{ color: "green" }}>yeps</p>}
        <Button
          buttonName={signupMutation.isPending ? "Sender..." : "Email Send"}
          size="lg"
        />
        <Button
        typeAction="button"
          elementType="button"
          type={"tertiary"}
          buttonName="Login"
          size="lg"
          onClick={onToggleLogin}
        />
        <Button
        typeAction="button"
          elementType="button"
          type={"tertiary"}
          buttonName="Sign up"
          size="lg"
          onClick={onToggleSignup}
        />
      </form>
    </>
  );
}
