import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
    height: 2rem;
    width: 40rem;
    border-radius: 3px;
    border: 1;
    outline: none;
    position: relative;
    margin: 0.5rem;
    padding-left: 0.25rem;
    font-size: 16px;
    font-weight: 500px;

    &:focus {
        outline: none;
    }
`;

const Input = ({onChange, value, style}) => {
  return (
    <StyledInput 
      onChange={(e) => onChange(e.target.value)} value={value} 
      placeholder="Seach for..."
    />
  )
}

export default Input;