import { useMutation } from "react-apollo";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CREATE_BROKER } from "graphql/mutattions/brokers";
import { BROKERS } from "graphql/queries/brokers";
import swal from "sweetalert";
import { CountryOption, Selector } from "../../../components";
import countriesData from "../../../assets/countriesData";

const AddBrokerForm = ({ editing, setShow }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [create] = useMutation(CREATE_BROKER, {
    refetchQueries: [{ query: BROKERS }],
  });

  useEffect(() => {
    if (editing) {
      setValue("re_broker_name", editing?.re_broker_name);
      setValue("re_broker_email", editing?.re_broker_email);
      setValue("re_primary_phone", editing?.re_broker_address?.re_primary_phone);
      setValue("re_secondary_phone", editing?.re_broker_address?.re_secondary_phone);
      setValue("re_broker_website", editing?.re_broker_website);
      setValue("street", editing?.re_broker_address?.street);
      setValue(
        "re_primary_phone",
        editing?.re_broker_address?.re_primary_phone
      );
      setValue(
        "re_secondary_phone",
        editing?.re_broker_address?.re_secondary_phone
      );
      setValue("region", editing?.re_broker_address?.region);
      setValue("country", editing?.address?.country);
      setValue("city", editing?.re_broker_address?.city);
    }
  }, [editing, setValue]);

  const handleAddEmployee = (values) => {
    const input = {
      re_broker_email: values.re_broker_email,
      re_broker_name: values.re_broker_name,
      re_broker_website: values.re_broker_website,
      re_broker_address: {
        city: values.city,
        street: values.street,
        region: values.region,
        country: values.country,
        re_primary_phone: values.re_primary_phone,
        re_secondary_phone: values.re_secondary_phone,
      },
    };
    swal({
      icon: "warning",
      title: "Are you sure?",
      text: "Once added, the broker becomes a part of the system",
      buttons: [
        "Cancel",
        { text: "Yes, create broker", value: "Yes", closeModal: false },
      ],
    }).then((res) => {
      if (!res) throw null;
      create({ variables: { input } })
        .then((res) => {
          setShow(false);
          swal({
            title: "Success!",
            text: "Broker has been added",
            icon: "success",
          });
        })
        .catch((err) => {
          swal({
            title: "Error!",
            text: err.message,
            icon: "error",
          });
        });
    });
  };
  const handleUpdateEmployee = () => {};

  const handleCountrySelect = (value) => {
    setValue("country", value ? value.label : "");
    setSelectedCountry(value);
  };

  useEffect(() => {
    const countriesList = [];
    countriesData.map((country, index) => {
      const c = {
        label: country.name,
        value: country.name,
      };
      countriesList.push(c);
      return c;
    });
    setCountries(countriesList);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="form-group">
          <h3 className="modal-title">{editing ? "View" : "Add"} Broker</h3>
        </div>
        <form
          onSubmit={handleSubmit(
            editing ? handleUpdateEmployee : handleAddEmployee
          )}
          className="row"
        >
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Company name</label>
              <input
                type="text"
                name="re_broker_name"
                ref={register({ required: "Required" })}
                className="form-control"
                placeholder="Company name"
              />
              {errors.re_broker_name && (
                <p className="text-danger">{errors.re_broker_name.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Company email</label>
              <input
                type="email"
                name="re_broker_email"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
                className="form-control"
                placeholder="Company email"
              />
              {errors.re_broker_email && (
                <p className="text-danger">{errors.re_broker_email.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Company primary phone</label>
              <input
                type="tel"
                name="re_primary_phone"
                ref={register({
                  required: "Required",
                })}
                className="form-control"
                placeholder="Company primary phone"
              />
              {errors.re_primary_phone && (
                <p className="text-danger">{errors.re_primary_phone.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Company secondary phone</label>
              <input
                type="tel"
                name="re_secondary_phone"
                ref={register({
                  required: false,
                })}
                className="form-control"
                placeholder="Company secondary phone"
              />
              {errors.re_secondary_phone && (
                <p className="text-danger">
                  {errors.re_secondary_phone.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Company website</label>
              <input
                type="text"
                name="re_broker_website"
                ref={register({ required: false })}
                className="form-control"
                placeholder="Company website"
              />
              {errors.re_broker_website && (
                <p className="text-danger">
                  {errors.re_broker_website.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Region</label>
              <input
                type="text"
                name="region"
                ref={register({
                  required: "Required",
                })}
                className="form-control"
                placeholder="Region"
              />
              {errors.region && (
                <p className="text-danger">{errors.region.message}</p>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">City</label>
              <input
                type="text"
                name="city"
                ref={register({
                  required: "Required",
                })}
                className="form-control"
                placeholder="City"
              />
              {errors.city && (
                <p className="text-danger">{errors.city.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Street</label>
              <input
                type="text"
                name="street"
                ref={register({
                  required: "Required",
                })}
                className="form-control"
                placeholder="Street"
              />
              {errors.street && (
                <p className="text-danger">{errors.street.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label> Country</label>
              <Selector
                value={selectedCountry}
                placeholder="Country"
                onChange={handleCountrySelect}
                components={{ Option: CountryOption }}
                options={countries}
              />
              <input
                ref={register({
                  required: "Country is required",
                })}
                type="hidden"
                name="country"
                placeholder="Country"
                className="form-control"
              />
              {errors.country && (
                <p className="text-danger">{errors.country.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group d-flex justify-content-end">
              <button type="submit" className="btn btn-sm btn-primary w-md">
                {editing ? "Update" : "Add"} Broker
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrokerForm;
