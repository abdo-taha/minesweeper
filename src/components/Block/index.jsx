import React from "react";
import { BlockDiv } from "./style.js";
export const Block = ({ value, blockSize, click, state, markClick, ready }) => {
  return (
    <BlockDiv
      $blockSize={blockSize}
      $state={state}
      $ready={ready}
      onClick={click}
      $value={value}
      onContextMenu={markClick}
    >
      <p>
        {state === "marked" ? (
          "🚩"
        ) : value === 0 ? (
          <></>
        ) : value === -1 ? (
          "💣"
        ) : (
          value
        )}
      </p>
    </BlockDiv>
  );
};
