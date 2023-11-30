const Direction = {
    Up: "Up",
    Down: "Down",
    Left: "Left",
    Right: "Right",
};
const State = {
    Clicked: "clicked",
    NotCLicked: "not clicked",
    Marked: "marked",
};

const Satisfied = {
    ClickMe: "ClickMe",
    Not: "NOT",
    Satisfied: "Satisfied"
}



const next = (position, direction, width, height) => {
    if (position === -1) return -1;
    switch (direction) {
        case Direction.Up:
            if (position < width) return -1;
            return position - width;
        case Direction.Down:
            if (position + width >= height * width) return -1;
            return position + width;
        case Direction.Right:
            if (position % width === width - 1) return -1;
            return position + 1;
        case Direction.Left:
            if (position % width === 0) return -1;
            return position - 1;
        default:
            return -1;
    }
};

const surroundings = (position, width, height) => {
    let ret = [];
    const up = next(position, Direction.Up, width, height);
    const down = next(position, Direction.Down, width, height);
    ret.push(up);
    ret.push(down);
    ret.push(next(position, Direction.Left, width, height));
    ret.push(next(position, Direction.Right, width, height));
    ret.push(next(up, Direction.Left, width, height));
    ret.push(next(up, Direction.Right, width, height));
    ret.push(next(down, Direction.Left, width, height));
    ret.push(next(down, Direction.Right, width, height));
    ret = ret.filter((number) => number !== -1);
    return ret;
};



const changeBlocks = (height, width, minesCount) => {
    const blocks = new Array(height * width);
    for (let index = 0; index < blocks.length; index++)
        blocks[index] = {
            value: 0,
            state: State.NotCLicked,
            satisfied: Satisfied.Not
        };
    /*random mines*/
    for (let index = 0; index < minesCount; index++) {
        while (true) {
            let rand = Math.floor(Math.random() * blocks.length);
            if (blocks[rand].value !== -1) {
                blocks[rand].value = -1;
                break;
            }
        }
    }
    for (let index = 0; index < blocks.length; index++) {
        if (blocks[index].value === -1) continue;
        const sur = surroundings(index, width, height);
        sur.forEach((nxt) => {
            if (blocks[nxt].value === -1) blocks[index].value++;
        });
    }
    return blocks;
}



export { Direction, State, next, surroundings, changeBlocks, Satisfied }