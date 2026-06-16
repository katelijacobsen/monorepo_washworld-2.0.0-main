import Icon from "@/app/global/components/Icon";

type Props = {
  kg?: number;
};

export default function Co2Card({ kg = 23.5 }: Props) {
  return (
    <article className="rounded-12 bg-bg-dark text-bg px-16 py-12 flex items-center justify-between gap-16">
      <div className="flex items-center gap-12">
        <span className="flex items-center justify-center w-[32px] h-[32px] rounded-full border border-primary-400 text-primary-400">
          <Icon iconName="leaf" />
        </span>
        <div className="flex flex-col leading-tight">
          <p className="uppercase text-base font-bold">CO2-aftryk</p>
          <p className="uppercase text-xs text-grey-100">
            Dit forbrug for denne måned
          </p>
        </div>
      </div>
      <p className="text-primary-400 font-bold text-xl leading-none">
        {kg}
        <span className="text-sm font-bold ml-2">kg</span>
      </p>
    </article>
  );
}
