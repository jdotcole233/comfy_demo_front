/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import { Selector } from '../../components'
import { useMutation } from "@apollo/client";
import { UPDATE_REINSURER } from '../../graphql/mutattions';
import { REINSURER } from '../../graphql/queries';
import swal from 'sweetalert';
import countriesData from '../../assets/countriesData'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { edit_reinsurer_access } from '../../layout/adminRoutes';




function EditReinsurer({ closed, toggle, data }) {
    const { state: { user } } = useContext(AuthContext)
    const { register, handleSubmit, errors, setValue, reset } = useForm();
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        if (!closed) {
            reset();
        }
    }, [closed, reset])


    useEffect(() => {
        if (data) {
            setValue("re_company_name", data?.reinsurer.re_company_name)
            setValue("re_company_email", data?.reinsurer.re_company_email)
            setValue("street", data?.reinsurer.reinsurer_address.street)
            setValue("region", data?.reinsurer.reinsurer_address.region)
            setValue("country", data?.reinsurer.reinsurer_address.country)
            setSelectedCountry({ label: data?.reinsurer.reinsurer_address.country, value: data?.reinsurer.reinsurer_address.country })
            setValue("suburb", data?.reinsurer.reinsurer_address.suburb)
            setValue("re_company_website", data.reinsurer.re_company_website)
        }
    }, [data])


    useEffect(() => {
        const countriesList = [];
        countriesData.map((country, index) => {
            const c = {
                label: country.name,
                value: country
            }
            countriesList.push(c);
            return c;
        })
        setCountries(countriesList)
    }, [])

    const [updateReinsurer] = useMutation(UPDATE_REINSURER, {
        refetchQueries: [{ query: REINSURER, variables: { id: data?.reinsurer.reinsurer_id } }]
    })

    const handleUpdateReinsurer = reinsurer => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: `Are you sure you want to update ${reinsurer.re_company_name} ?`,
            text: ``,
            buttons: ["No", {
                text: "Yes",
                closeModal: false
            }],
        })
            .then(input => {
                if (!input) throw null;
                updateReinsurer({
                    variables: {
                        reinsurer,
                        reinsurer_id: data?.reinsurer.reinsurer_id
                    }
                }).then(json => {
                    toggle();
                    swal("Sucess", "Reinsurer updated Successfully", "success");
                })
                    .catch(err => {
                        if (err) {
                            swal("Sorry!!", err.message.replace("GraphQL error:",""), "error");
                        } else {
                            swal.stopLoading();
                            swal.close();
                        }
                    });;
            })

    }

    const onSubmit = values => {
        handleUpdateReinsurer(values);
    };


    const handleCountrySelect = value => {
        setValue("country", value ? value.label : "")
        setSelectedCountry(value)
    }





    const CountryOption = ({ innerProps, isSelected, isDisabled, label, value }) =>
        !isDisabled && !isSelected ? (
            <div {...innerProps} className="row d-flex align-items-center p-1">
                <div className="col-md-2 d-flex justify-content-center">
                    <span className="avatar-sm d-flex justify-content-center align-items-center  header-profile-user  bg-soft-primary text-primary font-size-16">
                        {value.alpha2Code || "NA"}
                    </span>
                </div>
                <div className="col-md-10">
                    <h4>{label}</h4>
                    <p>{value.alpha2Code}</p>
                </div>

            </div>
        ) : null;

    return (
        <div>
            <div className="row">
                <div className="form-group">
                    <h3 className="modal-title">Edit Reinsurer</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="row">

                    <div className="col-md-12">
                        <fieldset className="border p-2 mb-2">
                            <legend className="w-auto" style={{ fontSize: 16 }}>Edit reinsurer</legend>
                            <div className="row" >
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="">Company name</label>
                                        <input ref={register({
                                            required: "Company name is Required"
                                        })} name="re_company_name" type="text" className="form-control" placeholder="Company name" />
                                        {errors.re_company_name && <p className="text-danger">{errors.re_company_name.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Email</label>
                                        <input ref={register({
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "Invalid email address"
                                            }
                                        })} name="re_company_email"

                                            type="email"
                                            className="form-control"
                                            placeholder="Email" />
                                        {errors.re_company_email && <p className="text-danger">{errors.re_company_email.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Website</label>
                                        <input ref={register({
                                            required: "Company website is required"
                                        })} name="re_company_website"

                                            type="text"
                                            className="form-control"
                                            placeholder="Website" />
                                        {errors.re_company_website && <p className="text-danger">{errors.re_company_website.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="">Street Address</label>
                                        <input ref={register({
                                            required: "Street address is required"
                                        })}
                                            name="street"

                                            type="text"
                                            className="form-control"
                                            placeholder="Street Address"
                                        />
                                        {errors.re_company_website && <p className="text-danger">{errors.re_company_website.message}</p>}

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="">Suburb/city</label>
                                        <input
                                            ref={register({
                                                required: "Suburb/city is required"
                                            })}
                                            name="suburb"

                                            type="text"
                                            className="form-control"
                                            placeholder="Suburb" />
                                        {errors.suburb && <p className="text-danger">{errors.suburb.message}</p>}

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="">Region/State</label>
                                        <input
                                            ref={register({
                                                required: "Region/State is required"
                                            })}
                                            name="region"

                                            type="text"
                                            className="form-control"
                                            placeholder="Region" />
                                        {errors.region && <p className="text-danger">{errors.region.message}</p>}

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label> Country</label>
                                        <Selector value={selectedCountry} placeholder="Country" onChange={handleCountrySelect} components={{ Option: CountryOption }} options={countries} />
                                        <input ref={register({
                                            required: "Country is required"
                                        })} type="hidden" name="country" list="movies" placeholder="Country" className="form-control" />
                                        {errors.country && <p className="text-danger">{errors.country.message}</p>}

                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group d-flex justify-content-end">
                            {edit_reinsurer_access.includes(user?.user_role?.position) && <button type="submit" className="btn btn-sm btn-primary w-md">Edit Reinsurer</button>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditReinsurer
