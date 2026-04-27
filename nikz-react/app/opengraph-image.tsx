import { ImageResponse } from "next/og";

export const alt = "Nicollas Rezende — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0b0c12",
          backgroundImage:
            "radial-gradient(ellipse at top left, rgba(125,207,255,0.18), transparent 60%), radial-gradient(ellipse at bottom right, rgba(187,154,247,0.18), transparent 60%)",
          color: "#e6ebff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 20,
            letterSpacing: "0.18em",
            color: "#c0caf5",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 12,
              backgroundColor: "#9ece6a",
              boxShadow: "0 0 16px #9ece6a",
            }}
          />
          NIKZ / 2026
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 32,
              letterSpacing: "0.32em",
              color: "#7dcfff",
              textTransform: "uppercase",
            }}
          >
            Full Stack Developer
          </div>
          <div
            style={{
              fontSize: 148,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#e6ebff",
            }}
          >
            Nicollas Rezende
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#8089b3",
              letterSpacing: "0.04em",
              marginTop: 8,
            }}
          >
            Java · Spring · Liferay · React · Python · Automacao
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: "0.2em",
            color: "#565f89",
            textTransform: "uppercase",
          }}
        >
          <span>Brasilia / BR</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#9ece6a",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: "#9ece6a",
                boxShadow: "0 0 12px #9ece6a",
              }}
            />
            Available
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
