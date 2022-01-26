/* eslint-disable no-throw-literal */
import React, { useState, useEffect, useContext } from 'react'
import swal from 'sweetalert';
import { useMutation } from "@apollo/client";
import { CREATE_CLASS_OF_BUSINESS } from '../../graphql/mutattions';
import { DrawerContext } from '../../components/Drawer';
import { FETCH_CLASS_OF_BUSINESS } from '../../graphql/queries';





export default ({ toggle }) => {
    const { closed } = useContext(DrawerContext);
    const [addintionalInputFields, setaddintionalInputFields] = useState([]);
    const [businessname, setBusinessname] = useState("")


    const [createClassOFBusiness] = useMutation(CREATE_CLASS_OF_BUSINESS, {
        variables: {
            businessname,
            business_details: JSON.stringify(addintionalInputFields)
        },
        refetchQueries: [{ query: FETCH_CLASS_OF_BUSINESS }]
    })

    useEffect(() => {
        if (closed) {
            setaddintionalInputFields([]);
            setBusinessname("");
        }
    }, [closed])

    const [detailCount, setCount] = useState(0);
    const handleAddInput = e => {
        const newInput = {
            keydetail: "",
            value: ""
        }
        setCount(detailCount + 1)
        setaddintionalInputFields([...addintionalInputFields, newInput]);
    }

    const handleRemoveInput = e => {
        setaddintionalInputFields([...addintionalInputFields.slice(0, addintionalInputFields.length - 1)])
    }

    const handleRemoveParticularInput = id => {
        const newSet = [...addintionalInputFields];
        newSet.splice(id, 1)
        setaddintionalInputFields(newSet)
    }

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const inputs = [...addintionalInputFields];
        inputs[index]["keydetail"] = value
        setaddintionalInputFields(inputs)
    }

    const handleCreateBusinesss = e => {
        const business_details = addintionalInputFields.filter(el => el.keydetail.length > 0);
        if (business_details.length < addintionalInputFields.length) {
            swal("Notice", "Either fill out the empty fields or remove them", 'warning');
        } else {
            swal({
                icon: "warning",
                title: "Are you sure ?",
                text: `You want to add ${businessname} with  ${business_details.length} detail(s) to Afro-AsianSystem?.`,
                buttons: ["No", {
                    text: "Yes",
                    closeModal: false
                }],
            })
                .then(name => {
                    if (!name) throw null;
                    return createClassOFBusiness();
                })
                .then(json => {
                    setBusinessname("");
                    setaddintionalInputFields([]);
                    setCount(0)
                    toggle();
                    swal("Success", "Class of Business Created Successfully", "success");
                })
                .catch(err => {
                    if (err) {
                        swal("Sorry!!", err.message.replace("GraphQL error:",""), "error");
                    } else {
                        swal.stopLoading();
                        swal.close();
                    }
                });
        }
    }

    return (
        <div>
            <div className="row">
                <div className="form-group">
                    <h3 className="modal-title">Create a class of business</h3>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="">Business Name</label>
                <input value={businessname} onChange={e => setBusinessname(e.target.value)} type="text" className="form-control" placeholder="eg. Marine Cargo" />
            </div>
            <div className="form-group">
                <div className="row mb-2">
                    <div className="col-md-12">
                        <button onClick={handleAddInput} className="btn btn-primary mr-2">+</button>
                        {addintionalInputFields.length ? <button onClick={handleRemoveInput} className="btn btn-danger">-</button> : ""}
                    </div>
                </div>
                <label htmlFor="">Business Details</label>
            </div>
            <div className="form-group">
                <div className="row">
                    {addintionalInputFields.map((el, key) => (
                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <input value={el.keydetail} onChange={e => handleInputChange(e, key)} type="text" className="form-control" placeholder={`Detail ${key + 1}`} />
                                <div className="input-group-prepend">
                                    <button onClick={() => handleRemoveParticularInput(key)} className="btn btn-danger" type="button">X</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="form-group">
                <button onClick={handleCreateBusinesss} disabled={!businessname} className="btn btn-primary btn-sm w-md">Create Business</button>
            </div>
        </div>
    )
}
