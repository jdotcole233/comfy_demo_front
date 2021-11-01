/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'

import { useForm } from 'react-hook-form'
import countriesData from '../../assets/countriesData'
import { useMutation } from "@apollo/client"
import { UPDATE_INSURER } from '../../graphql/mutattions'
import { INSURER } from '../../graphql/queries'
import swal from 'sweetalert'
import { AuthContext } from '../../context/AuthContext'
import { edit_insurer_access } from '../../layout/adminRoutes'



function EditInsurer({ toggle, data, closed }) {
    const { state: { user } } = useContext(AuthContext)
    const { register, errors, handleSubmit, reset, setValue } = useForm();
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (data) {
            setValue("insurer_company_name", data.insurer.insurer_company_name)
            setValue("insurer_company_email", data.insurer.insurer_company_email)
            setValue("street", data.insurer.insurer_address.street)
            setValue("region", data.insurer.insurer_address.region)
            setValue("country", data.insurer.insurer_address.country)
            setValue("suburb", data.insurer.insurer_address.suburb)
            setValue("insurer_company_website", data.insurer.insurer_company_website)
        }
    }, [data])

    useEffect(() => {
        if (!closed) {
            reset();
        }
    }, [closed, reset])



    const [updateInsurer] = useMutation(UPDATE_INSURER, {
        refetchQueries: [{ query: INSURER, variables: { id: data?.insurer.insurer_id } }]
    })




    useEffect(() => {
        const countriesList = [];
        countriesData.map((country, index) => {
            const c = {
                label: country.name,
                value: country.name
            }
            countriesList.push(c);
            return c;
        })
        setCountries(countriesList)
    }, [])



    const handleUpdateInsurer = insurer => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: `Are you sure you want to  update ${insurer.insurer_company_name}? `,
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw null;
            updateInsurer({
                variables: {
                    insurer,
                    insurer_id: data?.insurer.insurer_id
                }
            }).then(async res => {
                swal("Sucess", "Insurer Created Successfully", "success");
                toggle()
            })
                .catch(err => {
                    if (err) {
                        // console.log(err)
                        swal("Sorry!!", err.message.replace("GraphQL error:",""), "error");
                    } else {
                        swal.stopLoading();
                        swal.close();
                    }
                })
        })
    }


    return (
        <form onSubmit={handleSubmit(handleUpdateInsurer)}>
            <div className="row">
                <div className="form-group">
                    <h3 className="modal-title">Edit Insurer</h3>
                </div>
                <div className="row">

                    <div className="col-md-12">
                        <fieldset className="border p-2">
                            <legend className="w-auto" style={{ fontSize: 16 }}> Edit insurer</legend>
                            <div className="row" >
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="">Company name</label>
                                        <input name="insurer_company_name" ref={register({ required: "Required" })} type="text" className="form-control" placeholder="Company name" />
                                        {errors.insurer_company_name && <p className="text-danger">{errors.insurer_company_name.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Email</label>
                                        <input name="insurer_company_email" ref={register({
                                            required: "Required", pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "Invalid email address"
                                            }
                                        })} type="email" className="form-control" placeholder="Email" />
                                        {errors.insurer_company_email && <p className="text-danger">{errors.insurer_company_email.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Website</label>
                                        <input name="insurer_company_website" ref={register({ required: false })} type="text" className="form-control" placeholder="Website" />
                                        {errors.insurer_company_website && <p className="text-danger">{errors.insurer_company_website.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="">Street Address</label>
                                        <input name="street" ref={register({ required: "Required" })} type="text" className="form-control" placeholder="Street Address" />
                                        {errors.street && <p className="text-danger">{errors.street.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="">Suburb/city</label>
                                        <input name="suburb" ref={register({ required: "Required" })} type="text" className="form-control" placeholder="Suburb" />
                                        {errors.suburb && <p className="text-danger">{errors.suburb.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="">Region/State</label>
                                        <input name="region" ref={register({ required: "Required" })} type="text" className="form-control" placeholder="Region" />
                                        {errors.region && <p className="text-danger">{errors.region.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="">Country</label>
                                        <input ref={register({
                                            required: "Required"
                                        })} type="text" name="country" list="movies" placeholder="Country" className="form-control" />
                                        {errors.country && <p className="text-danger">{errors.country.message}</p>}

                                        <datalist id="movies">
                                            <select name="movies" className="form-control">
                                                {countries.map((country, key) => (
                                                    <option key={key} value={country.label} />
                                                ))}
                                            </select>
                                        </datalist>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="col-md-12 mt-2">
                        <div className="form-group d-flex justify-content-end">
                            {edit_insurer_access.includes(user?.position) && <button type="submit" className="btn btn-sm btn-primary w-md">Edit Insurer</button>}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EditInsurer
