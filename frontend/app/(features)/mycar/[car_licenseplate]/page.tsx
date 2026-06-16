"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/app/global/components/Header";
import Button from "@/app/global/components/Button";
import Dialog from "@/app/global/components/Dialog";
import { useCars } from "@/app/(features)/mycar/hooks/useCars";
import { carImgSrc } from "@/app/lib/images";
import { useDeleteCar } from "../hooks/useDeleteCar";

export default function SingleCarPage() {
  const { car_licenseplate } = useParams<{ car_licenseplate: string }>();
  // URL-params kommer percent-encoded ("AB%20123456") — decode før sammenligning
  const plate = decodeURIComponent(car_licenseplate);
  const router = useRouter();
  const { data: cars, isPending } = useCars();
  const car = cars?.find((c) => c.car_licenseplate === plate); // find bilen i cachen
  const deleteMutation = useDeleteCar();

  useEffect(() => {
    if (deleteMutation.isSuccess && deleteMutation.variables) {
      sessionStorage.setItem("carDeleted", deleteMutation.variables); // gem PK'en (så "Fortryd" ved hvilken bil)
      router.push("/mycar");
    }
  }, [deleteMutation.isSuccess, deleteMutation.variables, router]);

  if (isPending) return <p>Loading...</p>;
  if (!car) return <p>Kan ikke finde bilen</p>;

  return (
    <>
      <Header
        title={car.car_licenseplate}
        backButton={{
          elementType: "link",
          goBack: true,
          size: "sm",
          type: "none",
          status: "normal",
          iconName: "back",
        }}
      />
      <main className="flex flex-col">
        <img
          src={carImgSrc(car.car_image)}
          alt={car.car_licenseplate}
          className="w-full aspect-image object-cover bg-grey-100 rounded-2"
        />

        <dl className="flex flex-row content-stretch ">
          <div className="bg-primary-100">
            <dt className="text-sm text-grey-200">Nummerplade</dt>
            <dd>{car.car_licenseplate}</dd>
          </div>
          <div className="bg-primary-100">
            <dt className="text-sm text-grey-200">Seneste vask</dt>
            <dd>{car.car_most_recent_wash || "Endnu ikke vasket"}</dd>
          </div>
        </dl>

        <Button
          elementType="button"
          buttonName="Fjern bil"
          size="lg"
          type="tertiary"
          status="danger"
          dialogId="delete-car-dialog"
        />
        <Button
          elementType="button"
          buttonName="Opdatér"
          size="lg"
          type="primary"
          status="normal"
          dialogId="update-car"
        />

        <Dialog
          id="delete-car-dialog"
          title="Er du sikker på du vil slette denne bil?"
          buttonTwo={{
            elementType: "button",
            buttonName: "Slet",
            size: "sm",
            type: "primary",
            status: "danger",
            onClick: () => deleteMutation.mutate(car.car_pk),
          }}
          buttonThree={{
            elementType: "button",
            buttonName: "Anullér",
            size: "sm",
            type: "secondary",
            status: "normal",
          }}
        />
      </main>
    </>
  );
}
