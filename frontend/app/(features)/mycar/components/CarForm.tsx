"use client";

import { useState } from "react";
import { useCreateCar } from "../hooks/useCreateCar";
import Button from "@/app/global/components/Button";
import Input from "@/app/global/components/Input";
import CarImage from "./CarImage";
import { CAR_LICENSEPLATE_MAX, CAR_LICENSEPLATE_MIN } from "@/app/global/store/validation";
import { CarProps } from "../types/types";

export default function CarForm({ onSuccess, onCancel }: CarProps) {
  const [licenseplate, setLicenseplate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const createMutation = useCreateCar();

  const re = 
  licenseplate.trim().length >= CAR_LICENSEPLATE_MIN &&
  licenseplate.trim().length <= CAR_LICENSEPLATE_MAX;
  
function handleSubmit(e: React.SyntheticEvent) {
  e.preventDefault();
  if (!re) return;
  createMutation.mutate(
    { car_licenseplate: licenseplate, car_image: image },
    {
      onSuccess: () => {
        setLicenseplate("");
        setImage(null);
        onSuccess?.();          // luk dialog + vis snackbar — én gang
      },
    }
  );
}
  const error_msg = (createMutation.error as any)?.response?.data?.msg;

  return (
    <form onSubmit={handleSubmit} className="grid gap-24 p-16 ">
      <fieldset>
        <legend className="uppercase text-center font-bold text-lg">Tilføj Bil</legend>

        <Input
          type="text"
          name="car_licenseplate"
          label="car_licenseplate"
          inputLabel="Nummerplade"
          value={licenseplate}
          onChange={setLicenseplate}
          minLength={CAR_LICENSEPLATE_MIN}
          maxLength={CAR_LICENSEPLATE_MAX}
          required
        />

        <CarImage onSelect={setImage} />

        {error_msg && <p className="text-sm text-danger">{error_msg}</p>}

        <div className="flex justify-around gap-12">
          <Button
            typeAction="button"
            elementType="button"
            buttonName="Annullér"
            size="lg"
            type="tertiary"
            onClick={onCancel}
          />
          <Button
            typeAction="submit"
            elementType="button"
            buttonName={createMutation.isPending ? "Tilføjer..." : "Tilføj"}
            size="lg"
            type="primary"
          />
        </div>
      </fieldset>
    </form>
  );
}
