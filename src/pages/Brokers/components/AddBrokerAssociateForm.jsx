import { CREATE_BROKER_ASSOCIATE } from "graphql/mutattions/brokers";
import React from "react";
import { useMutation } from "react-apollo";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Selector } from "../../../components";
import styles from "../styles/ViewReinsurerOffer.module.css";

const AddBrokerAssociateForm = ({ setShow, broker }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [createAssociate] = useMutation(CREATE_BROKER_ASSOCIATE, {
    refetchQueries: ["brokers"],
  });

  const handleAddAssociate = (values) => {
    swal({
      icon: "warning",
      title: "Add associate ?",
      text:
        "This action adds the " +
        values?.re_broker_assoc_first_name +
        " to the associates of " +
        broker?.re_broker_name,
      buttons: ["Cancel", { text: "Yes, continue", closeModal: false }],
    }).then((res) => {
      if (!res) throw null;
      createAssociate({ variables: { re_broker_associate: { ...values } } })
        .then((_res) => {
          swal("Huuray", "Associate added successfully", "success");
          setShow(false);
        })
        .catch((err) => {
          swal("Whoops!", "Associate not added successfully", "error");
        });
    });
  };
  return (
    <div>
      <div className="row form-group">
        <h3 className="col-md-12 modal-title">Add Associate</h3>
        <fieldset className="col-md-12 border p-2 mb-2">
          <legend className={styles.details_title}>Broker Details</legend>
          <table className="table table-responsive">
            <tbody>
              <tr>
                <td>Company name</td>
                <td>{broker?.re_broker_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{broker?.re_broker_email}</td>
              </tr>
              <tr>
                <td>Website</td>
                <td>{broker?.re_broker_website}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit(handleAddAssociate)} className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Frist name</label>
              <input
                type="text"
                name="re_broker_assoc_first_name"
                ref={register({ required: "Required" })}
                className="form-control"
                placeholder="Frist name"
              />
              <input
                type="hidden"
                name="re_brokersre_broker_id"
                value={broker?.re_broker_id}
                ref={register({ required: true })}
              />
              {errors.re_broker_assoc_first_name && (
                <p className="text-danger">
                  {errors.re_broker_assoc_first_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Last name</label>
              <input
                type="text"
                name="re_broker_assoc_last_name"
                ref={register({ required: "Required" })}
                className="form-control"
                placeholder="Last name"
              />
              {errors.re_broker_assoc_last_name && (
                <p className="text-danger">
                  {errors.re_broker_assoc_last_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="re_broker_assoc_email"
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
              {errors.re_broker_assoc_email && (
                <p className="text-danger">
                  {errors.re_broker_assoc_email.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group alert alert-danger">
              <p>
                Phone numbers should be prepended with country code <br />
                Eg. 233506339153
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Primary phone</label>
              <input
                type="tel"
                name="re_broker_assoc_primary_phone"
                ref={register({
                  required: "Required",
                })}
                className="form-control"
                placeholder="primary phone"
              />
              {errors.re_broker_assoc_primary_phone && (
                <p className="text-danger">{errors.re_broker_assoc_primary_phone.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Secondary phone</label>
              <input
                type="tel"
                name="re_broker_assoc_secondary_phone"
                ref={register({
                  required: false,
                })}
                className="form-control"
                placeholder="secondary phone"
              />
              {errors.re_broker_assoc_secondary_phone && (
                <p className="text-danger">
                  {errors.re_broker_assoc_secondary_phone.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Position</label>
              <select
                className="form-control"
                name="re_broker_assoc_position"
                ref={register({ required: "Required" })}
              >
                <option value="">choose a position</option>
                <option value="Manager">Manager</option>
                <option value="Underwriter">Underwriter</option>
              </select>
              {errors.re_broker_assoc_position && (
                <p className="text-danger">
                  {errors.re_broker_assoc_position.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group d-flex justify-content-end">
              <button type="submit" className="btn btn-sm btn-primary w-md">
                Create Associate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrokerAssociateForm;
