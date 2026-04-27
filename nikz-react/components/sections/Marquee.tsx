import { MARQUEE_ITEMS } from "@/lib/content";
import { Fragment } from "react";

export default function Marquee() {
  const row = (
    <>
      {MARQUEE_ITEMS.map((it, i) => (
        <Fragment key={i}>
          <span>{it}</span>
          <span className="star">✦</span>
        </Fragment>
      ))}
    </>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
