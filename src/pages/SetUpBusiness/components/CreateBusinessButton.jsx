import React, { useState } from 'react'
import CreateClassOfBusiness from '../CreateClassOfBusiness';
import { Drawer } from '../../../components';

const CreateBusinessButton = () => {
    const [showCreateBusinessForm, setshowCreateBusinessForm] = useState(false);

    return (
        <>
            <button onClick={() => setshowCreateBusinessForm(!showCreateBusinessForm)} className="btn  btn-sm w-md waves-effect btn-success">Create Business</button>

            {/* Create business modal */}
            <Drawer width="40%" toggle={() => setshowCreateBusinessForm(!showCreateBusinessForm)} isvisible={showCreateBusinessForm}>
                <CreateClassOfBusiness toggle={() => setshowCreateBusinessForm(!showCreateBusinessForm)} />
            </Drawer>
        </>
    )
}

export default CreateBusinessButton
