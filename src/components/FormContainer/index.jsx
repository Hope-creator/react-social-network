import React from 'react';

import "./FormContainer.scss"

const FormContainer = ({children}) => {
    return (
        <div className="formContainer">
            {children}
        </div>
    )
}

export default FormContainer