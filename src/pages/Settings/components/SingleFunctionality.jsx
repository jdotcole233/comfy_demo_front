import React, { useState, useEffect } from 'react'

const SingleFunctionality = ({ name, onChange, selected, remove }) => {
    const [checked, setActive] = useState(false)

    useEffect(() => {
        if (selected) {
            setActive(selected)
        }
    }, [selected])

    const handleSelected = () => {
        setActive(prev => !prev)
        if (!selected)
            onChange(name)
        else
            remove(name)
    }

    return (
        <div className="d-flex mb-3 align-items-center cursor-pointer" onClick={handleSelected}>
            {checked && <span style={{}} className="bx bxs-check-circle text-primary mr-3"></span>}
            {!checked && <span style={{}} className="bx bx-radio-circle text-primary mr-3"></span>}
            <h5>{name}</h5>
        </div>
    )
}

export default SingleFunctionality
