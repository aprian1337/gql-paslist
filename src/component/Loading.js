import React from "react";

export default function Loading() {
  return (
    <div>
      <svg
        style={{
          margin: "auto",
          background: "none",
          display: "block",
          shapeRendering: "auto",
        }}
        width="50px"
        height="50px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="0"
          fill="none"
          stroke="#1c4595"
          stroke-width="18"
        >
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.0408163265306123s"
            values="0;33"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
            begin="0s"
          ></animate>
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="2.0408163265306123s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
            begin="0s"
          ></animate>
        </circle>
        <circle
          cx="50"
          cy="50"
          r="0"
          fill="none"
          stroke="#e76a24"
          stroke-width="18"
        >
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.0408163265306123s"
            values="0;33"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
            begin="-1.0204081632653061s"
          ></animate>
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="2.0408163265306123s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
            begin="-1.0204081632653061s"
          ></animate>
        </circle>
      </svg>
    </div>
  );
}
