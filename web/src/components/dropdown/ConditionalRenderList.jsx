import React from 'react'
import styled from 'styled-components';
// import KeyPressDetection from './KeyPressDetection';

const StyledList = styled.div`
    position: absolute;
    margin: 0.15rem;
    top: 3.75rem;
    width: 20rem;
    border: 1px solid #232323;
    border-radius: 15px;
    background: #232323;
`;

const StyledItem = styled.div`
    padding: 0.25rem;
    color: ${({danger}) => danger || '#fff'};
    font-size: 14px;
    font-weight: 700;
    border-radius: 15px;

    &:hover {
        background: ${({danger}) => danger ? 'transparent' : '#1bb953'};
        cursor: ${({danger}) => danger ? 'normal' : 'pointer'};
    }
`;

const ConditionalRenderList = ({value, list, setValue, toggle, setToggle, handleKeyDown, setFirstOption}) => {

    // const handleKeyDown = (e) => {
    //     console.log(e.keyCode);
    // }

    if(value) {
        const filteredList = list.filter(item => item.toString().toLowerCase().includes(value.toLowerCase()));

        if(filteredList.length) {
            return (
                toggle &&
                (
                    <StyledList>
                        {
                            filteredList.map((item, idx) => 
                                <StyledItem
                                    key={idx} 
                                    onClick={() => {
                                        setToggle(false);
                                        setValue(item);
                                    }} 
                                >
                                    {item}
                                </StyledItem>)
                        }
                    </StyledList>
                )
            )
        }

        return (
            <StyledList>
                <StyledItem danger="orangered">
                    Not found
                </StyledItem>
            </StyledList>
        )

    }

    return null;
}

export default ConditionalRenderList