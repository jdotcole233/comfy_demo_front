import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddBrokerForm = ({ editing, setShow }) => {
  const { register, handleSubmit, errors, setValue } = useForm();

  useEffect(() => {
    if (editing) {
      setValue("broker_company_name", editing?.broker_company_name);
      setValue("broker_company_email", editing?.broker_company_email);
      setValue("broker_phone", editing?.broker_phone);
      setValue("broker_company_website", editing?.broker_company_websit);
      setValue("street_address", editing?.address?.street_address);
      setValue("suburb", editing?.address?.suburb);
      setValue("country", editing?.address?.country);
      setValue("city", editing?.address?.city);
    }
  }, [editing, setValue]);

  const handleAddEmployee = () => {};
  const handleUpdateEmployee = () => {};

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
                name="broker_company_name"
                ref={register({ required: "Required" })}
                className="form-control"
                placeholder="Company name"
              />
              {errors.broker_company_name && (
                <p className="text-danger">
                  {errors.broker_company_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Company Email</label>
              <input
                type="email"
                name="broker_company_email"
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
              {errors.broker_company_email && (
                <p className="text-danger">
                  {errors.broker_company_email.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Company website</label>
              <input
                type="text"
                name="broker_company_website"
                ref={register({ required: false })}
                className="form-control"
                placeholder="Company website"
              />
              {errors.broker_company_website && (
                <p className="text-danger">
                  {errors.broker_company_website.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Street address</label>
              <input
                type="text"
                name="street_address"
                ref={register({ required: "Required" })}
                className="form-control"
                placeholder="Street address"
              />
              {errors.street_address && (
                <p className="text-danger">{errors.street_address.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Suburb</label>
              <input
                type="text"
                name="suburb"
                ref={register({
                  required: "Required",
                })}
                className="form-control"
                placeholder="Suburb"
              />
              {errors.suburb && (
                <p className="text-danger">{errors.suburb.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Country</label>
              <input
                type="text"
                name="country"
                ref={register({
                  required: "Required",
                })}
                className="form-control"
                placeholder="Country"
              />
              {errors.country && (
                <p className="text-danger">{errors.country.message}</p>
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
