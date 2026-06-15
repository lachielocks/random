import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7c3aed",
          borderRadius: 8,
          fontSize: 22,
          fontWeight: "bold",
          color: "white",
          fontFamily: "serif",
          paddingBottom: 1,
        }}
      >
        R
      </div>
    ),
    { ...size }
  );
}
