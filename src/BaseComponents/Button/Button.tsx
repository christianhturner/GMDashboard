import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";


const StyledButton = styled.button`
    color: ${props => props.theme.colors.main}
`;

interface ButtonProps extends React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
    return <StyledButton {...props}> {children}</StyledButton>

}

