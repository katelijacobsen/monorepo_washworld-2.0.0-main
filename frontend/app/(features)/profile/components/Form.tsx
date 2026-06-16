"use client";

import { User } from "@/app/global/types/global";
import { useEffect, useState } from "react";
import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
// custom hook
import { useUpdateUser } from "../hooks/useUpdateUser";
import { USER_PHONENUMBER_MIN, USER_PHONENUMBER_MAX, USER_FULLNAME_MIN, USER_FULLNAME_MAX, USER_ADDRESS_MIN, USER_ADDRESS_MAX } from "@/app/global/store/validation";

type Props = { user: User; onSave: () => void; onCancel: () => void };

export default function Form({ user, onSave, onCancel }: Props) {
  // Sætter i hver personlige info den nuværende info
  const [fullname, setFullname] = useState(user.user_fullname);
  const [email, setEmail] = useState(user.user_email);
  const [phoneNumber, setPhoneNumber] = useState(user.user_phonenumber);
  const [address, setAddress] = useState(user.user_address);
  const updateMutation = useUpdateUser();
  const errorData = (updateMutation.error as any)?.response?.data;
  const tooltip = errorData?.tooltip as string | undefined;
  const errorMessage = errorData?.error as string | undefined;

  useEffect(() => {
    if (updateMutation.isSuccess) onSave();
  }, [updateMutation.isSuccess, onSave]);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    updateMutation.mutate({
      user_fullname: fullname,
      user_email: email,
      user_phonenumber: phoneNumber,
      user_address: address,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-24">
      <fieldset className="flex flex-col gap-16 border-0 p-0">
        <legend className="sr-only">Personlige oplysninger</legend>

        <Input
          type="text"
          name="user_fullname"
          label="user_fullname"
          inputLabel="Fulde navn"
          value={fullname}
          onChange={setFullname}
          minLength={USER_FULLNAME_MIN}
          maxLength={USER_FULLNAME_MAX}
          required
        />
        {tooltip === "user_fullname" && (
          <p className="text-sm text-danger">{errorMessage}</p>
        )}

        <Input
          type="email"
          name="user_email"
          label="user_email"
          inputLabel="Email"
          value={email}
          onChange={setEmail}
          required
        />
        {tooltip === "user_email" && (
          <p className="text-sm text-danger">{errorMessage}</p>
        )}

        <Input
          type="tel"
          name="user_phonenumber"
          label="user_phonenumber"
          inputLabel="Telefonnummer"
          value={phoneNumber}
          onChange={setPhoneNumber}
          minLength={USER_PHONENUMBER_MIN}
          maxLength={USER_PHONENUMBER_MAX}
          required
        />
        {tooltip === "user_phonenumber" && (
          <p className="text-sm text-danger">{errorMessage}</p>
        )}

        <Input
          type="text"
          name="user_address"
          label="user_address"
          inputLabel="Adresse"
          value={address}
          onChange={setAddress}
          minLength={USER_ADDRESS_MIN}
          maxLength={USER_ADDRESS_MAX}
          required
        />
        {tooltip === "user_address" && (
          <p className="text-sm text-danger">{errorMessage}</p>
        )}
      </fieldset>

      <div className="flex flex-col gap-12">
        <Button
          typeAction="submit"
          elementType="button"
          buttonName={
            updateMutation.isPending ? "loading..." : "Opdater Profil"
          }
          size="lg"
          type="primary"
        />
        <Button
          typeAction="button"
          elementType="button"
          buttonName="Annullér"
          size="lg"
          type="tertiary"
          onClick={onCancel}
        />
      </div>
    </form>
  );
}
