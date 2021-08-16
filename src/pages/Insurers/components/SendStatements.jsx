import React, { useState } from 'react'
import { getFlexibleName } from '../Note'

const SendStatements = ({ treaty, reinsurer }) => {
    const [, setNote] = useState(null);
    const [, setStatement] = useState("Treaty Statement");
    const chooseNote = note_id => {
        const note = treaty?.treaty_accounts?.find(_note => _note?.treaty_account_id === note_id)
        setNote(note)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="Statement Type">Notes</label>
                        <select onChange={(e) => setStatement(e.target.value)} className="form-control" name="statement_type" id="statement_type">
                            <option value="">Select ...</option>
                            <option value="Treaty Statement">Treaty Statement</option>
                            <option value="Credit Note">Credit Note</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="Statement Type">Quarter</label>
                        <select onChange={(e) => chooseNote(e.target.value)} className="form-control" name="statement_type" id="statement_type">
                            <option value="">Select ...</option>
                            {treaty?.treaty_accounts?.map((note, key) => (
                                <option value={note?.treaty_account_id}>{getFlexibleName(note?.account_periods)}</option>

                            ))}

                        </select>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default SendStatements
