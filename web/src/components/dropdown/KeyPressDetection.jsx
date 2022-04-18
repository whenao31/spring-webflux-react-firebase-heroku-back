import React, { useEffect, useRef }from 'react'

const KeyPressDetection = ({ onKeyDown, setEnter }) => {
    const ref = useRef();

    useEffect(() => {
      function handleKeyDown(e) {
        if (!ref.current || ref.current.contains(e.target)) {
          return;
        }
  
        onKeyDown(e);
      }
  
      document.addEventListener("keydown", handleKeyDown);
  
      return function cleanup() {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
  
    return (
      <div ref={ref} tabIndex="0">
      </div>
    );
}

export default KeyPressDetection