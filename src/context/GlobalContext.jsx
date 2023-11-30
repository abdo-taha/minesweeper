import { createContext, useCallback, useEffect, useState } from "react";
import { State, surroundings, Satisfied, changeBlocks } from "./globalHelper";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState({
    height: 32,
    width: 18,
    blockSize: 1.3,
    minesCount: 150,
    blocks: null,
    playing: false,
    lost: false,
  });

  const isReady = useCallback((target, blocks, sur, pos) => {
    let notClicked = 0,
      bombs = 0;
    sur.forEach((v) => {
      bombs += blocks[v].state === State.Marked;
      notClicked += blocks[v].state === State.NotCLicked;
    });
    console.log(pos, target, notClicked, bombs);
    if (bombs === target && notClicked) return Satisfied.ClickMe;
    if (target === notClicked + bombs && notClicked) return Satisfied.Satisfied;
    return Satisfied.Not;
  }, []);

  const updateSur = useCallback(
    (position, newBlocks) => {
      let sur = surroundings(position, globalData.width, globalData.height);
      sur.push(position);
      sur.forEach((v) => {
        if (newBlocks[v].state === State.Clicked && newBlocks[v].value > 0)
          newBlocks[v].satisfied = isReady(
            newBlocks[v].value,
            newBlocks,
            surroundings(v, globalData.width, globalData.height),
            v
          );
      });
      return newBlocks;
    },
    [isReady, globalData.width, globalData.height]
  );

  const clickHelper = useCallback(
    (position, blocks, width, height) => {
      console.log("clicked ", position);
      const sur = surroundings(position, width, height);
      let newBlocks = blocks;
      if (newBlocks[position].state === State.Clicked) {
        if (newBlocks[position].value > 0) {
          let count = newBlocks[position].value;
          sur.forEach((val) => {
            count -= newBlocks[val].state === State.Marked;
          });
          if (!count)
            sur.forEach((val) => {
              if (newBlocks[val].state === State.NotCLicked)
                newBlocks = clickHelper(val, newBlocks, width, height);
            });
        }
        return newBlocks;
      }
      if (newBlocks[position].state === State.NotCLicked) {
        newBlocks[position].state = State.Clicked;
        newBlocks = updateSur(position, newBlocks);
      }
      if (newBlocks[position].value < 0) {
        newBlocks.forEach((v, i) => {
          if (newBlocks[i].value < 0) newBlocks[i].state = State.Clicked;
        });
      } else if (!newBlocks[position].value) {
        sur.forEach(
          (pos) => (newBlocks = clickHelper(pos, newBlocks, width, height))
        );
      }
      return newBlocks;
    },
    [updateSur]
  );
  const click = useCallback(
    (e, position) => {
      if (globalData.lost) return;
      let newBlocks = globalData.blocks;
      if (!globalData.playing) {
        while (newBlocks[position].value) {
          newBlocks = changeBlocks(
            globalData.height,
            globalData.width,
            globalData.minesCount
          );
        }
        setGlobalData((old) => ({ ...old, playing: true, blocks: newBlocks }));
      }
      newBlocks = clickHelper(
        position,
        newBlocks,
        globalData.width,
        globalData.height
      );
      setGlobalData((old) => ({
        ...old,
        blocks: newBlocks,
        lost: newBlocks[position].value < 0 ? true : false,
      }));
    },
    [globalData, clickHelper]
  );

  const markClick = useCallback(
    (e, position) => {
      e.preventDefault();
      console.log("mark ", position);
      if (globalData.lost) return;
      let newBlocks = globalData.blocks;
      if (newBlocks[position].state === State.NotCLicked) {
        newBlocks[position].state = State.Marked;
      } else if (newBlocks[position].state === State.Marked) {
        newBlocks[position].state = State.NotCLicked;
      } else return;
      newBlocks = updateSur(position, newBlocks);

      setGlobalData((old) => ({ ...old, blocks: newBlocks }));
    },
    [globalData.blocks, globalData.lost, updateSur]
  );

  const reset = useCallback(
    (e) => {
      e.preventDefault();
      setGlobalData((old) => ({
        ...old,
        playing: false,
        lost: false,
        blocks: changeBlocks(
          globalData.height,
          globalData.width,
          globalData.minesCount
        ),
      }));
    },
    [globalData.height, globalData.width, globalData.minesCount]
  );

  /*create array of mines and numbers */
  useEffect(() => {
    const blocks = changeBlocks(
      globalData.height,
      globalData.width,
      globalData.minesCount
    );
    setGlobalData((old) => ({ ...old, blocks: blocks, gameStarted: false }));
  }, [globalData.height, globalData.width, globalData.minesCount]);

  return (
    <GlobalContext.Provider
      value={{ globalData, setGlobalData, click, markClick, reset }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
