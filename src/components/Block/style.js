import styled from "styled-components"



const BlockDiv = styled.div`
    height: ${(props) => (props.$blockSize)}rem;
    aspect-ratio: 1;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    background-color:${(props) => (props.$state === "clicked" ? props.$value === -1 ? "#b11414" : "#79aaae" : "black")} ;
    filter: ${(props) => (props.$ready === "ClickMe" ? "hue-rotate(287deg);" : props.$ready === "Satisfied" ? "hue-rotate(180deg);" : "unset")}; 
    cursor: pointer;
    &:hover{
         filter: brightness(85%);
         box-shadow: 0px 0px 3px 2px #7e898d inset;
    }
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    &>p{
        visibility: ${(props) => (props.$state !== "not clicked" ? "visible" : "hidden")};
    }
        box-shadow: 0px 0px 1px 1px #1f7d9f inset;

`
export { BlockDiv }