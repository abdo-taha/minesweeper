import styled from "styled-components"

const GameBodyDiv = styled.div `
    width: ${(props) => (props.$width * props.$blockSize)}rem;
    height: ${(props) => (props.$height * props.$blockSize)}rem;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    margin: auto;
`

const Button = styled.button `
    background-color: #1b6d8b;
    border: none;
    color: white;
    padding: 10px 26px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
`


export { GameBodyDiv, Button }