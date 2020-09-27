/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import { Alert } from 'react-bootstrap'
import { Selector,InsurerOption } from '../../components'
import { useMutation, useQuery } from 'react-apollo';
import { CREATE_REINSURER, UPDATE_REINSURER } from '../../graphql/mutattions';
import { REINSURERS, REINSURER, INSURERS } from '../../graphql/queries';
import swal from 'sweetalert';
import countriesData from '../../assets/countriesData'
import { useForm } from 'react-hook-form';
// import { DrawerContext } from '../../components/Drawer';
import { AuthContext } from '../../context/AuthContext';
import { editAccessRoles } from '../../layout/adminRoutes';




function AddInsurer({ edit, toggle, data, closed }) {
    // const { closed } = useContext(DrawerContext);
    const { state: { user } } = useContext(AuthContext)
    const [choice, setChoice] = useState("")

    const { data: insurers } = useQuery(INSURERS);
    const { register, handleSubmit, errors, setValue, reset } = useForm();
    const [selectedInsurer, setSelectedInsurer] = useState(null);
    const [insurersData, setInsurersData] = useState([])
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [formInputs, setFormInputs] = useState({
        re_company_name: "",
        re_company_email: "",
        re_company_website: "",
        street: "",
        suburb: "",
        region: "",
        country: "",
    })


    useEffect(() => {
        if (insurers) {
            const rows = insurers.insurers.map(insurer => ({ label: insurer.insurer_company_name, value: insurer }));
            setInsurersData(rows);
        }
    }, [insurers])

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
        if (closed) {
            setChoice("")
            reset();
            setFormInputs({
                re_company_name: "",
                re_company_email: "",
                re_company_website: "",
                street: "",
                suburb: "",
                region: "",
                country: "",
            })
        }
    }, [closed])


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

    const [createReinsurer] = useMutation(CREATE_REINSURER, {
        variables: {
            ...formInputs
        },
        refetchQueries: [{
            query: REINSURERS
        }]
    })

    const [updateReinsurer] = useMutation(UPDATE_REINSURER, {
        refetchQueries: [{ query: REINSURER, variables: { id: data?.reinsurer.reinsurer_id } }]
    })

    const handleAddReinsurer = e => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: `Are you sure you want to ad ${formInputs.re_company_name} ?`,
            text: ``,
            buttons: ["No", {
                text: "Yes",
                closeModal: false
            }],
        })
            .then(input => {
                if (!input) throw null;
                createReinsurer().then(json => {
                    setFormInputs({
                        re_company_name: "",
                        re_company_email: "",
                        re_company_website: "",
                        street: "",
                        suburb: "",
                        region: "",
                        country: "",
                    })
                    toggle();
                    swal("Sucess", "Reinsurer Created Successfully", "success");
                    reset()
                    setSelectedCountry(null)
                })
                    .catch(err => {
                        if (err) {
                            swal("Oh noes!", "The AJAX request failed!", "error");
                        } else {
                            swal.stopLoading();
                            swal.close();
                        }
                    });
            })

    }

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
                            swal("Oh noes!", "The AJAX request failed!", "error");
                        } else {
                            swal.stopLoading();
                            swal.close();
                        }
                    });;
            })

    }

    const onSubmit = values => {
        setFormInputs(values);
        if (!edit) {
            handleAddReinsurer();
            return;
        }
        handleUpdateReinsurer(values);
    };

    const handleGetReinsurer = value => {
        setSelectedInsurer(value ? value.value : null)
    }

    const handleCountrySelect = value => {
        setValue("country", value ? value.label : "")
        setSelectedCountry(value)
    }

    useEffect(() => {
        if (selectedInsurer) {
            setValue("re_company_name", selectedInsurer?.insurer_company_name || "")
            setValue("re_company_email", selectedInsurer?.insurer_company_email)
            setValue("street", selectedInsurer?.insurer_address.street)
            setValue("region", selectedInsurer?.insurer_address.region)
            setValue("country", selectedInsurer?.insurer_address.country)
            setSelectedCountry(countries.find(country => country.label === selectedInsurer?.insurer_address.country))
            setValue("suburb", selectedInsurer?.insurer_address.suburb)
            setValue("re_company_website", selectedInsurer.insurer_company_website)
        } else {
            reset()
            setSelectedCountry(null)
        }
    }, [selectedInsurer])

    // const CustomOption = ({ innerProps, isSelected, isDisabled, label, value }) =>
    //     !isDisabled && !isSelected ? (
    //         <div {...innerProps} className="row p-2">
    //             <div className="col-md-8">
    //                 <h4>{label}</h4>
    //                 <p>{value.insurer_company_email}</p>
    //             </div>
    //             <div className="col-md-4 d-flex justify-content-end">
    //                 <span className="avatar-sm d-flex justify-content-center align-items-center rounded-circle header-profile-user rounded-circle bg-soft-primary text-primary font-size-16">
    //                     {value.insurer_abbrv || "NA"}
    //                 </span>
    //             </div>
    //         </div>
    //     ) : null;

    const CountryOption = ({ innerProps, isSelected, isDisabled, label, value }) =>
        !isDisabled && !isSelected ? (
            <div {...innerProps} className="row d-flex align-items-center p-1">
                <div className="col-md-2 d-flex justify-content-center">
                    <span className="avatar-sm d-flex justify-content-center align-items-center rounded-circle header-profile-user rounded-circle bg-soft-primary text-primary font-size-16">
                        {value.alpha2Code || "NA"}
                    </span>
                </div>
                <div className="col-md-10">
                    <h4>{label}</h4>
                    <p>{value.alpha2Code}</p>
                </div>

            </div>
        ) : null;

    const Form = (
        <div className="col-md-12">
            <fieldset className="border-form p-2 mb-2">
                <legend className="w-auto" style={{ fontSize: 16 }}>{!edit ? "Create new reinsurer" : "Edit reinsurer"}</legend>
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

                            {/* <datalist id="movies">
                                            <select name="movies" className="form-control">
                                                {countries.map((country, key) => (
                                                    <option key={key} value={country.label} />
                                                ))}
                                            </select>
                                        </datalist> */}
                            {errors.country && <p className="text-danger">{errors.country.message}</p>}

                        </div>
                    </div>
                </div>
            </fieldset>
        </div>

    )

    return (
        <div>
            <div className="">
                <div className="form-group">
                    <h3 className="modal-title">{!edit ? "Add" : "Edit"} Reinsurer</h3>
                </div>
                <div className="">
                    <fieldset className="border-form p-2 mb-2">
                        <legend className="w-auto" style={{ fontSize: 16 }}>Choose action</legend>
                        <div className="form-group">
                            <select name="" id="" onChange={evt => { setChoice(evt.target.value); setSelectedInsurer(null) }} className="form-control">
                                <option value="">Choose one</option>
                                <option value="new">Create new</option>
                                <option value="old">Add from list</option>
                            </select>
                            {/* {errors.insurer_company_name && <p className="text-danger">{errors.insurer_company_name.message}</p>} */}
                        </div>
                    </fieldset>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="row">
                    {!edit && choice === "old" && <div className="col-md-12">
                        <fieldset className="border-form p-2 mb-2">
                            <legend className="w-auto" style={{ fontSize: 16 }}>Add from list</legend>
                            <Alert variant="danger">
                                <strong>Select an Insurer from the list to add as a Reinsurer</strong>
                            </Alert>
                            <Selector components={{ Option: InsurerOption }} onChange={handleGetReinsurer} options={insurersData} />
                        </fieldset>
                    </div>}
                    {choice === "old" && selectedInsurer && Form}
                    {choice === "new" && Form}

                    {(choice || selectedInsurer) && <div className="col-md-12">
                        <div className="form-group d-flex justify-content-end">
                            {!edit && <button type="submit" className="btn btn-sm btn-primary w-md">Add Reinsurer</button>}
                            {editAccessRoles.includes(user?.position) && edit && <button type="submit" className="btn btn-sm btn-primary w-md">Edit Reinsurer</button>}
                        </div>
                    </div>}
                </form>
            </div>
        </div>
    )
}

export default AddInsurer
