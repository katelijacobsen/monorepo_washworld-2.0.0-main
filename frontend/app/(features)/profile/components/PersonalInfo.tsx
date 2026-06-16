"use client";

import { useState, useEffect } from "react";
import { User } from "@/app/global/types/global";
import Form from "./Form";
import Snackbar from "@/app/global/components/Snackbar";
import Button from "@/app/global/components/Button";
import { useLogout } from "../hooks/useLogout";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useRouter } from "next/navigation";

type Props = { user: User };

export default function PersonalInfo({ user }: Props) {
  const [Edit, setEdit] = useState(false);
  const [saved, setSaved] = useState<number | null>(null);
  // Snapshot af de GAMLE værdier (taget når formularen åbnes) — bruges til "Fortryd"
  const [prevValues, setPrevValues] = useState<User | null>(null);
  const logoutMutation = useLogout();
  const undoMutation = useUpdateUser();
  const router = useRouter();

  // Bruges efter man har logget ud
  useEffect(() => {
    if (logoutMutation.isSuccess) router.push("/");
  }, [logoutMutation.isSuccess, router]);


  return (
    <section className="flex flex-col gap-16">
      <h2 className="text-lg font-bold text-text">Mine Oplysninger</h2>
      {Edit ? (
        <Form
          user={user}
          onSave={() => {
            setEdit(false);
            setSaved(Date.now());
          }}
          onCancel={() => setEdit(false)}
        />
      ) : (
        <>
          <dl className="flex flex-col gap-16">
            <div className="flex flex-col gap-4 border-b border-grey-200 pb-8">
              <dt className="text-sm text-grey-200 font-bold">Email</dt>
              <dd className="text-base text-text">{user.user_email}</dd>
            </div>
            <div className="flex flex-col gap-4 border-b border-grey-200 pb-8">
              <dt className="text-sm text-grey-200 font-bold">Telefonnummer</dt>
              <dd className="text-base text-text">{user.user_phonenumber}</dd>
            </div>
            <div className="flex flex-col gap-4 border-b border-grey-200 pb-8">
              <dt className="text-sm text-grey-200 font-bold">Adresse</dt>
              <dd className="text-base text-text">{user.user_address}</dd>
            </div>
          </dl>

          <Button
            typeAction="button"
            elementType="button"
            buttonName="Opdater Profil"
            size="lg"
            type="primary"
            onClick={() => {
              setPrevValues(user); // gem de nuværende (gamle) værdier FØR man ændrer
              setEdit(true);
            }}
          />
          <Button
            elementType="button"
            buttonName="Log ud"
            size="lg"
            type="secondary"
            status="normal"
            onClick={() => logoutMutation.mutate()}
          />
        </>
      )}
      {saved && prevValues && (
        <Snackbar
          key={saved}
          message="Profil opdateret"
          duration={3000}
          onUndo={() => {
            // send de GAMLE værdier tilbage = fortryd ændringen
            undoMutation.mutate({
              user_fullname: prevValues.user_fullname,
              user_email: prevValues.user_email,
              user_phonenumber: prevValues.user_phonenumber,
              user_address: prevValues.user_address,
            });
            setSaved(null); // skjul snackbaren
          }}
        />
      )}
    </section>
  );
}
