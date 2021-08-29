import React, { useState, useCallback } from 'react'
import { Prompt, Drawer } from '../../components'
import DeleteDeduction from './DeleteDeduction'
import NewDeduction from './NewDeduction'

const DeductionButtons = ({ deduction, setOpenDeductions, treaty }) => {
    const [deletePrompt, setDeletePrompt] = useState(false)
    const [editdeduction, setEditdeduction] = useState(false)

    const handleClickdelete = useCallback((deduction) => {
        setDeletePrompt(prev => !prev)
    }, [])

    const handleClickEdit = useCallback((deduction) => {
        setEditdeduction(prev => !prev)
    }, [])


    const closeEverything = () => {
        // setOpenDeductions(false);
        setEditdeduction(false)
    }

    return (
        <>
            <button onClick={() => handleClickEdit(deduction)} className="btn btn-sm  btn-primary mr-1">Edit</button>
            <button onClick={() => handleClickdelete(deduction)} className="btn btn-sm btn-danger">Delete</button>

            <Prompt isvisible={deletePrompt} toggle={() => setDeletePrompt(prev => !prev)}>
                <DeleteDeduction deduction={deduction} onClose={() => setDeletePrompt(prev => !prev)} />
            </Prompt>

            <Drawer isvisible={editdeduction} width="40%" toggle={() => setEditdeduction(c => !c)}>
                <NewDeduction deduction={deduction} treaty={treaty} close={closeEverything} />
            </Drawer>
        </>
    )
}

export default DeductionButtons
