"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/global/components/Header";
import Button from "@/app/global/components/Button";
import Dialog from "@/app/global/components/Dialog";
import PersonalOverview from "./components/PersonalOverview";
import PersonalInfo from "./components/PersonalInfo";
import PaymentInfo from "./components/PaymentInfo";
// custom hook
import { useDeleteUser } from "./hooks/useDeleteUser";
import { useSession } from "./hooks/useSession";

export default function ProfilePage() {
  const router = useRouter();

  const sessionQuery = useSession();
  const deleteMutation = useDeleteUser();

    // Bruges efter man har slettet profilen
  useEffect(() => {
    if (deleteMutation.isSuccess) router.push("/");
  }, [deleteMutation.isSuccess, router]);



  if (!sessionQuery.data) return null;
  const user = sessionQuery.data;

  return (
    <>
      <Header
        title="Min Profil"
        backButton={{
          elementType: "link",
          goBack: true,
          size: "xs",
          type: "none",
          status: "normal",
          iconName: "back",
        }}
      />
      <main className="flex flex-col gap-32 py-24">
        {/*Personlige Overblik & Medlemskab */}
        <PersonalOverview user={user} />
        {/*Personlige Information */}
        <PersonalInfo user={user} />
        {/* Betalingsmuligheder */}
        <PaymentInfo />
        {/* Slet Profil */}
        <Button
          elementType="button"
          buttonName="Slet Profil"
          size="lg"
          type="tertiary"
          status="danger"
          dialogId="delete-profile-dialog"
        />

        {/* Popup/Dialog */}
        <Dialog
          id="delete-profile-dialog"
          title="Er du sikker på du vil slette din profil?"
          buttonTwo={{
            elementType: "button",
            buttonName: "Annullér",
            size: "sm",
            type: "secondary",
            status: "normal",
          }}
          buttonThree={{
            elementType: "button",
            buttonName: "Slet",
            size: "sm",
            type: "primary",
            status: "danger",
            onClick: () => deleteMutation.mutate(),
          }}
        />
      </main>
    </>
  );
}
