import Button from "./Button";
import Icon from "./Icon";
import { ButtonProps } from "./Button";

interface DialogProps {
  id: string; // We need an ID so the parent page can find it
  title?: string;
  buttonOne?: ButtonProps;
  buttonTwo?: ButtonProps;
  buttonThree?: ButtonProps;
}

const Dialog = ({ id, title, buttonTwo, buttonThree }: DialogProps) => {
  return (
    <dialog id={id} className="backdrop:bg-black/50 min-w-[280px] max-w-[336px] p-32 mt-80 mx-auto rounded-md shadow-lg">

      <form method="dialog" className="grid gap-32">
        <div>
        <p className="uppercase text-center font-bold">{title}</p>
        </div>

        <Icon iconName="trash" size="lg" style="justify-self-center text-primary-600"></Icon>
        <div className="flex justify-around">
            {buttonTwo && <Button {...buttonTwo} typeAction="submit" />}
            {buttonThree && <Button {...buttonThree} typeAction="submit" />}
        </div>
      </form>
    </dialog>
  );
};

export default Dialog;

// EXAMPLE:
// <Dialog id="any id you choose" buttonTwo={{ elementType: "button", buttonName:"Back", size: "", type: "primary", status: "normal" }} buttonThree={{ elementType: "button", buttonName:"Delete", size: "", type: "primary", status: "danger" }}/>

// OBS REMEMBER ON THE BUTTON:
// dialogId ="any id you choose"