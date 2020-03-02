import styled from "styled-components";

const SubmitVertexButton = styled.button`
    height: 3em;
    width: 10em;
    background: ${props => props.theme.ternary};
    border-radius: 5px;
    border: 4px solid ${props => props.theme.ternary};
    color: ${props => props.theme.secondary};
    margin: 0.25em 1em;
    padding: 0.25em 1em;
    transition: 0.2s;
    &:hover{
      font-size: 1rem;
      cursor: pointer;
    }
`;

export default SubmitVertexButton;