import styled from "styled-components";
import {Link} from "react-router-dom";

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.primary};
    transition: 0.2s;
    &:hover{
      color: ${props => props.theme.secondary};
    }
`;

export default StyledLink;