import styled from "styled-components";

const Button = styled.button`
    height: 5em;
    width: 10em;
    background: none;
    border-radius: 5px;
    border: 5px solid ${props => props.theme.primary};
    color: ${props => props.theme.primary};
    margin: 0.25em 1em;
    padding: 0.25em 1em;
    transition: 0.2s;
    &:hover{
      background: ${props => props.theme.secondary};
      font-size: 1.2rem;
      cursor: pointer;
    }
`;

export default Button;