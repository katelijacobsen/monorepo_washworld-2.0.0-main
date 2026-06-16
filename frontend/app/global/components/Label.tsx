import "../styles/label.css";
import Icon from "./Icon";

interface LabelProps {
  title?: string;
  subText?: string;
  labelAmount: "one" | "two" | "three";
  angle?: "normal" | "reverse";
  labelStyle?: string;

  iconStyle?: string;
  iconName?: string;
  iconNameOne?: string;
  iconNameTwo?: string;
  iconNameThree?: string;
  iconSize?: "lg" | "sm";
  style?: string;
}

const Label = ({
  title,
  subText,
  labelAmount,
  angle,
  labelStyle,
  iconNameOne,
  iconNameTwo,
  iconNameThree,
  iconStyle,
  iconSize,
  style = "bg-primary-800 text-bg-light",
}: LabelProps) => {
  //                             Here is the different size options with their styles from label.css
  const sizeStyle = {
    lg: "angled-shape--lg",
    sm: "angled-shape--sm",
  };

  

  let labelTypes = "";
const shape = {
  normal:  "before:origin-bottom before:skew-x-[30deg]",   // top-højre hjørne skåret
  reverse: "before:origin-top before:skew-x-[-30deg]",     // spejlet: bund-højre skåret
} as const;

  if (labelAmount === "one") {
    return (
      <div
        className={`relative isolate overflow-hidden w-fit
        grid grid-cols-[auto_1fr] gap-x-48 items-center gap-y-8
        pl-6 py-6 pr-40
        before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-bg-dark
        ${shape[angle === "reverse" ? "reverse" : "normal"]}
        ${style} ${labelStyle}`}
      >
        {iconNameOne && (
          <Icon iconName={iconNameOne} style={iconStyle} size={iconSize} />
        )}
        <span className="text-md text-trim">Medlemsskab</span>
        {subText && <p className="col-span-2 text-lg font-bold text-trim">{subText}</p>}
      </div>
    );
  }

  //                                          Her er til 2 labels ved siden af hinanden

  if (labelAmount === "two") {
    labelTypes = `angled-shape ${style} ${subText ? sizeStyle["lg"] : sizeStyle["sm"]} ${labelStyle}`;
    return (
      <div className="grid grid-cols-15 grid-rows-1 gap-16">
        <div
          className={`${labelTypes} angled-shape--right-reverse col-start-1 col-end-9 row-start-1 px-8 grid grid-cols-[1fr_5fr] grid-rows-2 items-center justify-start
      ${angle === "reverse" ? "angled-shape--right-reverse" : "angled-shape--right"}`}
        >
          {iconNameOne && (
            <Icon iconName={iconNameOne} style={iconStyle} size={iconSize} />
          )}
          <h1>{title}</h1>
          {subText && <p className="col-span-2">{subText}</p>}
        </div>

        <div
          className={` ${labelTypes} angled-shape--left col-start-8 -col-end-1 row-start-1 pr-8 pl-32 grid grid-cols-[4fr_1fr] grid-rows-2 items-center justify-items-end
      ${angle === "reverse" ? "angled-shape--left" : "angled-shape--left-reverse"}`}
        >
          {iconNameTwo && (
            <Icon iconName={iconNameTwo} style={iconStyle} size={iconSize} />
          )}
          <h1>{title}</h1>
          {subText && <p className="col-span-2">{subText}</p>}
        </div>
      </div>
    );
  }

  //                                     Her er til 3 labels ved siden af hinanden

  if (labelAmount === "three") {
    labelTypes = `angled-shape ${style} ${subText ? sizeStyle["lg"] : sizeStyle["sm"]} ${labelStyle} `;
    return (
      <div className="grid grid-cols-12 grid-rows-1 gap-16">
        <div
          className={`${labelTypes} col-start-1 col-end-6 row-start-1 p-8 grid grid-cols-[1fr_4fr] grid-rows-2 items-center justify-start
      ${angle === "reverse" ? "angled-shape--right" : "angled-shape--right-reverse"}`}
        >
          {iconNameOne && (
            <Icon iconName={iconNameOne} style={iconStyle} size={iconSize} />
          )}
          <h1>{title}</h1>
          {subText && <p className="col-span-2">{subText}</p>}
        </div>

        <div
          className={`${labelTypes} col-start-5 col-end-10 row-start-1 py-8 grid grid-cols-[1fr_1fr] grid-rows-2 items-center justify-center
      ${angle === "reverse" ? "angled-shape--both-reverse" : "angled-shape--both"}`}
        >
          <div className="flex col-span-2 gap-4 items-center justify-center">
            {iconNameTwo && (
              <Icon iconName={iconNameTwo} style={iconStyle} size={iconSize} />
            )}
            <h1>{title}</h1>
          </div>
          {subText && <p className="col-span-2">{subText}</p>}
        </div>

        <div
          className={` ${labelTypes} angled-shape--left col-start-9 col-end-13 row-start-1 p-8 grid grid-cols-[2fr_1fr] grid-rows-2 items-start justify-end
      ${angle === "reverse" ? "angled-shape--left" : "angled-shape--left-reverse"}`}
        >
          {iconNameThree && (
            <Icon
              iconName={iconNameThree}
              style={`${iconStyle} justify-self-end`}
              size={iconSize}
            />
          )}
          <h1>{title}</h1>
          {subText && <p className="col-span-2">{subText}</p>}
        </div>
      </div>
    );
  }
};

export default Label;
