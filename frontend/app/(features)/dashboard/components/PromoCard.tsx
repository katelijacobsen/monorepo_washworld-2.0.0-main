import Link from "next/link";

export default function PromoCard() {
  return (
    <article className="relative overflow-hidden rounded-12 bg-bg-dark text-bg p-20">
      <span
        aria-hidden="true"
        className="absolute right-[-16px] top-[-8px] text-[140px] leading-none font-bold text-grey-400 select-none"
      >
        W
      </span>
      <div className="relative flex flex-col gap-12">
        <p className="uppercase text-sm leading-tight">
          Mangler du en vask
          <br />
          der passer til dig?
        </p>
        <Link
          href="/membership-signup"
          className="text-primary-400 font-bold text-base inline-flex items-center gap-8"
        >
          Bliv medlem i dag →
        </Link>
      </div>
    </article>
  );
}
