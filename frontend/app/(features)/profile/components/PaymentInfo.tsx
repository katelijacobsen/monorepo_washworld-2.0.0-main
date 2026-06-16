"use client";

import { useState } from "react";

type Card = { id: string; label: string };

const cards: Card[] = [
  { id: "card1", label: "**** **** **** 1234" },
  { id: "card2", label: "**** **** **** 5678" },
  { id: "new", label: "Tilføj nyt betalingskort" },
];

export default function PaymentInfo() {
  const [selected, setSelected] = useState<string>("card1");

  return (
    <section className="flex flex-col gap-16">
      <h2 id="payment-heading" className="text-lg font-bold text-text">
        Mine Betalingskort
      </h2>
      <ul className="flex flex-col gap-12" aria-labelledby="payment-heading">
        {cards.map((card) => {
          const isSelected = selected === card.id;
          return (
            <li key={card.id}>
              <label
                className={`flex items-center gap-12 px-16 py-12 rounded-4 border-2 bg-surface cursor-pointer ${
                  isSelected ? "border-primary-400" : "border-grey-100"
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value={card.id}
                  checked={isSelected}
                  onChange={() => setSelected(card.id)}
                  className="appearance-none w-24 h-24 rounded-full border-2 border-grey-200 checked:border-primary-400 checked:bg-primary-400 checked:shadow-[inset_0_0_0_3px_var(--color-surface)] shrink-0"
                />
                <span className="text-base text-text font-medium">{card.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
