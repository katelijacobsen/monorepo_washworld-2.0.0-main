"use client";

import Button from "@/app/global/components/Button";
import Icon from "@/app/global/components/Icon";
import Label from "@/app/global/components/Label";

interface CarCardEmptyProps {
  variant: "empty";
  dialogId?: string;
  onAdd?: () => void;
}

interface CarCardFilledProps {
  variant: "filled";
  licensePlate: string;
  imageUrl: string;
  onDetails?: () => void;
}

type CarCardProps = CarCardEmptyProps | CarCardFilledProps;

const CarCard = (props: CarCardProps) => {
  if (props.variant === "empty") {
    return (
      <div className="bg-surface border-2 border-primary-100 rounded-2 flex flex-col items-center gap-16 p-24">
        <Icon iconName="car" size="lg" style="text-primary-200" />
        <Button
          linkHref=""
          elementType="button"
          buttonName="tilføj bil"
          size="lg"
          type="secondary"
          status="normal"
          iconName="circleplus"
          iconFlexPos="order-first"
          dialogId={props.dialogId}
          onClick={props.onAdd}
        />
      </div>
    );
  }

  return (
    <section className="rounded-2 overflow-hidden flex flex-col bg-surface border border-grey-100">
      <div className="relative">
        <img
          src={props.imageUrl}
          alt={props.licensePlate}
          className="w-full aspect-image object-cover bg-grey-100 rounded-t-2"
        />
        <div className="absolute top-0 left-0">
          <Label
            title={props.licensePlate}
            subText={props.licensePlate}
            labelAmount="one"
            angle="normal"
            style="text-primary-50 rounded-tl-2"
            labelStyle="whitespace-nowrap"
          />
        </div>
      </div>
      <div className="p-16">
        <Button
          elementType="button"
          buttonName="Se info"
          size="lg"
          type="primary"
          status="normal"
          onClick={props.onDetails}
        />
      </div>
    </section>
  );
};

export default CarCard;
