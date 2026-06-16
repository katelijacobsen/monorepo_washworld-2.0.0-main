import Icon from "@/app/global/components/Icon";

export default function Card() {
  return (
    <article itemScope itemType="https://schema.org/Product">
      <dl>
        <dt itemProp="name">Membership</dt>

        {/* søskende til <dt>, og scopet omslutter nu indholdet */}
        <dd
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
          className="flex flex-col gap-8"
        >
          <span>Price</span>
          <span>
            <span itemProp="price" content="199">199</span>{" "}
            <data itemProp="priceCurrency" value="DKK">kr.</data>
          </span>

          <details className="dropdown group relative inline-block">
            <summary className="flex gap-8 cursor-pointer list-none border-b-2 border-primary-400 px-12 py-8 [&::-webkit-details-marker]:hidden">
              Se fordele <Icon iconName="dropdown" style="transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <ul>
              <li>test 1</li>
              <li>test 2</li>
              <li>test 3</li>
              <li>test 4</li>
            </ul>
          </details>
        </dd>
      </dl>
    </article>
  );
}