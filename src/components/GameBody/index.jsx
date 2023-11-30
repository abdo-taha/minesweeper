import React, { useContext } from "react";
import { Button, GameBodyDiv } from "./style";
import { Block } from "../Block";
import { GlobalContext } from "../../context/GlobalContext";

export const GameBody = () => {
  const { globalData, click, markClick, reset } = useContext(GlobalContext);
  const width = globalData.width;
  const height = globalData.height;

  return (
    <>
      <Button onClick={reset}>new game</Button>

      <GameBodyDiv
        $width={width}
        $height={height}
        $blockSize={globalData.blockSize}
      >
        {globalData.blocks ? (
          globalData.blocks.map((item, i) => (
            <Block
              key={i}
              value={globalData.blocks[i].value}
              state={globalData.blocks[i].state}
              ready={globalData.blocks[i].satisfied}
              blockSize={globalData.blockSize}
              click={(e) => click(e, i)}
              markClick={(e) => markClick(e, i)}
            />
          ))
        ) : (
          <></>
        )}
      </GameBodyDiv>
    </>
  );
};
