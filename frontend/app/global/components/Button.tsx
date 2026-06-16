"use client"
import Link from "next/link";
import Icon from "./Icon";
import { IconNameType } from "./IconMap";
import { useRouter } from "next/navigation";


export interface ButtonProps {
  id?: string;
  typeAction?: "button" | "submit" | "reset";
  elementType?: "link" | "button";
  goBack?: boolean;
  linkHref?: string;
  buttonName?: string;
  size: "lg" | "sm" | "xs";
  dialogId?: string;
  iconName?: IconNameType;
  iconFlexPos?: string;
  isPage?: string;
  maxPage?: string;
  type?: "primary" | "secondary" | "tertiary" | "none";
  status?: "danger" | "success" | "normal";
  onClick?: () => void;
}


const Button = ({
  id= "",
  buttonName,
  size,
  elementType = "button",
  dialogId,
  linkHref,
  goBack,
  type = "primary",
  status = "normal",
  iconName,
  iconFlexPos,
  isPage,
  maxPage,
  onClick,
  typeAction = "button",
}: ButtonProps) => {

  const router = useRouter();

 const sizeStyle = {
  lg: "w-full py-8",
  sm: "w-fit p-8",
  xs: "w-fit px-8 leading-none",
};

  const statusStyles = {
    primary: {
      normal: "bg-primary-400 border-primary-800 text-bg-dark",
      danger: "bg-danger border-danger text-bg-dark",
      success: "bg-success border-success text-bg-dark",
    },
    secondary: { 
      normal: "bg-primary-50 border-primary-100 text-primary-800", 
      danger: "bg-danger-10-opacity border-danger text-danger", 
      success: "bg-success-10-opacity border-success text-success",
    },
    tertiary: { 
      normal: `${size === "xs" ? "border-primary-400 text-primary-400":"border-primary-800 text-primary-800"}`, 
      danger: "border-danger text-danger", 
      success: "border-success text-success",

    }, 
    none: { 
      normal: "text-primary-800", 
      danger: "text-danger", 
      success: "text-success", 
    }, 
  };

const iconStyles = { normal: "text-bg-black", danger: "text-danger", success: "text-success", };
  let buttonStyle = "";
  if (type === "primary") { buttonStyle = ` border-b-2 ${statusStyles.primary[status]} ${sizeStyle[size]}`; }
  if (type === "secondary") { buttonStyle = ` border-2 ${statusStyles.secondary[status]} ${sizeStyle[size]}`; }
  if (type === "tertiary") { buttonStyle = ` border-b-2 ${statusStyles.tertiary[status]} ${sizeStyle[size]}`; }
  if (type === "none") { buttonStyle = ` ${statusStyles.none[status]} `; } const iconStyle = iconStyles[status];

  return (
    <div  className={`flex items-center gap-8 ${size ==='lg' && 'w-full'}`}>
    {elementType === "button" ?
    <>
    <button
    id={id}
    type={typeAction}
    onClick={() => {
      if (dialogId) {
        (document.getElementById(dialogId) as HTMLDialogElement | null)?.showModal();
      }
      onClick?.();
    }}
    className={`h-fit rounded-2 uppercase flex justify-center font-bold
    ${buttonStyle}
    ${iconName && buttonName ? "gap-8":""}`}>
      <p>{buttonName}</p>
      {iconName && (<Icon iconName={iconName} style={`${iconFlexPos} ${iconStyle}`} />)}
    </button>
      {isPage && maxPage ? <p className="">{isPage}/{maxPage}</p> : ""} 
    </>
      : 
    <>
    <Link
    href={linkHref || "#"}
    onClick={
    goBack? (e) => {e.preventDefault(); router.back();}: undefined} /*This prevents conflicting navigation behavior.*/
    className={`h-fit rounded-2 uppercase flex justify-center font-bold 
    ${buttonStyle}
    ${iconName && buttonName ? "gap-8":""}`}>
      <p>{buttonName}</p>
      {iconName && (<Icon iconName={iconName} style={`${iconFlexPos} ${iconStyle}`} />)}
    </Link>
      {isPage && maxPage ? <p className="">{isPage}/{maxPage}</p> : ""} 
      </>
    }
    </div>
  );
};
export default Button;


/* COPY THIS IF YOU NEED:
<Button  elementType="" goBack={} linkHref="" buttonName="" size="" iconName="" iconFlexPos="" isPage="" maxPage="" iconStyle="" type="" status=""/>
*/