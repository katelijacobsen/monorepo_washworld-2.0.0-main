"use client";

import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
import { useState } from "react";
// custom hook
import { useResetPassword } from "../hooks/useResetPassword";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


type Props = { ResetKey: string };

export default function ResetPasswordForm({ ResetKey }: Props) {
    // useState
    const [resetPassword, setResetPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    // custom hook useLogin
    const resetPasswordMutation = useResetPassword();
    // Redirect 
    const router = useRouter();
    
    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        //smid custom hook ind i submit funktionen
        resetPasswordMutation.mutate({
            user_password: resetPassword,
            confirm_password: confirmpassword,
            key: ResetKey,
        });
    }
    // Redirect efter success for skifte password
    useEffect(() => {
      if (resetPasswordMutation.isSuccess) {
        router.push("/");
      }
    }, [resetPasswordMutation.isSuccess]);
    
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Reset Password</legend>
          <Input
            type="password"
            name="user_password"
            label="user_password"
            inputLabel="New password"
            value={resetPassword}
            onChange={setResetPassword}
          />
          <Input
            type="password"
            name="confirm_password"
            label="confirm_password"
            inputLabel="Confirm new password"
            value={confirmpassword}
            onChange={setConfirmPassword}
          />
        </fieldset>
        {resetPasswordMutation.isError && <p>Ugyldig Adgangskode</p>}
        {resetPasswordMutation.isSuccess && (
          <p style={{ color: "green" }}>Adgangskode er nu blevet ændret</p>
        )}
        <Button
          buttonName={
            resetPasswordMutation.isPending
              ? "Sender..."
              : "Change Password"
          }
          size="lg"
        />
      </form>
    </>
  );
}
