import React, {useState} from 'react'
import Input from './Input';
import ConditionalRenderList from './ConditionalRenderList'

export const SearchableDropdown = ({list, onChangeHandler, handleKeyDown, setFirstOption}) => {

    const [value, setValue] = useState("");
    const [toggle, setToggle] = useState(true);
    
    return (
        <>
            <h3>Search question</h3>
            <div style={{display: 'flex', flexDirection: 'column', padding: '1rem', alignItems: 'cente', position: 'relative'}}>
                <Input
                    onChange={(inputValue) => { 
                        setValue(inputValue); 
                        setToggle(true);
                        onChangeHandler(inputValue);
                    }}
                    value={value}
                />
                <ConditionalRenderList
                    value={value}
                    list={list}
                    setValue={(value) => {
                        setValue(value);
                        onChangeHandler(value);
                    }}
                    toggle={toggle}
                    setToggle={setToggle}
                    handleKeyDown={handleKeyDown}
                    setFirstOption={setFirstOption}
                />
            </div>
        </>
    )
}
