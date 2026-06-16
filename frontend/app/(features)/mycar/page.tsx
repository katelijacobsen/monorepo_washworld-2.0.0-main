"use client";

import Header from "@/app/global/components/Header";
import CarCard from "./components/CarCard";
import Snackbar from "@/app/global/components/Snackbar";
import { useEffect, useState } from "react";
import FormDialog from "./components/FormDialog";
import { useCars } from "./hooks/useCars";
import { carImgSrc } from "@/app/lib/images";
import { useRouter } from "next/navigation";
import { useRestoreCar } from "./hooks/useRestoreCar";

export default function Mycar() {
  const [added, setAdded] = useState<number | null>(null);
  const { data: cars} = useCars();
  const router = useRouter();
  const [deleted, setDeleted] = useState<number | null >(null);
  const [restore, setRestore] = useState<string | null > (null);
  const restoreMutation = useRestoreCar();

  useEffect(() => {
    const pk = sessionStorage.getItem("carDeleted")
    if(pk){
      setRestore(pk)
      setDeleted(Date.now())
    }
    sessionStorage.removeItem("carDeleted");
  
  }, [])
  

  return (
    <>
      <Header
        title="Min Bil"
        backButton={{
          elementType: "link",
          goBack: true,
          size: "sm",
          type: "none",
          status: "normal",
          iconName: "back",
        }}
      />
      <main className="flex flex-col gap-16 p-16">
        <CarCard variant="empty" dialogId="add-car-dialog" />
        {cars?.map((car) => (
          <CarCard
            key={car.car_pk}
            variant="filled"
            licensePlate={car.car_licenseplate}
            imageUrl={carImgSrc(car.car_image)}
            onDetails={ () => router.push(`/mycar/${car.car_licenseplate}`)}
          />
        ))}
        <FormDialog
          id="add-car-dialog"
          onSuccess={() => setAdded(Date.now())}
        />
      </main>
      {added && (
        <Snackbar key={added} message="Bil er nu tilføjet" duration={3000} />
      )}
      {deleted && restore && (
        <Snackbar key={deleted} message="Bil er blevet fjernet" duration={3000} onUndo={ () => {restoreMutation.mutate(restore); setRestore(null)}}/>
      )}

    </>
  );
}
