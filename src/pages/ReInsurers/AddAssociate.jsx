/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";
import { CREATE_ASSOCIATE } from "../../graphql/mutattions";
import { REINSURERS } from "../../graphql/queries";
import styles from "./styles/ViewReinsurerOffer.module.css";
import { DrawerContext } from "../../components/Drawer";
import { useForm } from "react-hook-form";

function AddAssociate({ details, toggle }) {
  const { closed } = useContext(DrawerContext);
  const { register, errors, handleSubmit, reset } = useForm();
  const [formInputs, setFormInputs] = useState({
    first_name: "",
    last_name: "",
    phone_pri: "",
    phone_sec: "",
    email: "",
    position: "",
    reinsurer_id: "",
  });

  useEffect(() => {
    if (closed) {
      setFormInputs({
        first_name: "",
        last_name: "",
        phone_pri: "",
        phone_sec: "",
        email: "",
        position: "",
        reinsurer_id: "",
      });
    }
  }, [closed]);
  useEffect(() => {
    if (details) {
      setFormInputs({
        ...formInputs,
        reinsurer_id: details.reinsurer_id,
      });
    }
  }, [details]);

  const [createAssociate] = useMutation(CREATE_ASSOCIATE, {
    refetchQueries: [{ query: REINSURERS }],
  });

  const handleAddAssociate = (values) => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to add" + formInputs.first_name + "?",
      text: ``,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    })
      .then((btn) => {
        if (!btn) throw null;
        return createAssociate({
          variables: values,
        });
      })
      .then((json) => {
        reset();
        toggle();
        swal("Sucess", "Associate added Successfully", "success");
      })
      .catch((err) => {
        if (err) {
          swal("Sorry!!", err.message.replace("GraphQL error:", ""), "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  };

  return (
    <div>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Add Associate</h2>

        <fieldset className="border p-2 mb-2">
          <legend className={styles.details_title}>Reinsurer Details</legend>
          <table className="table">
            <tbody>
              <tr>
                <td>Company name</td>
                <td>{details?.re_company_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{details?.re_company_email}</td>
              </tr>
              <tr>
                <td>Website</td>
                <td>{details?.re_company_website}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
      <form
        onSubmit={handleSubmit(handleAddAssociate)}
        className={styles.card_body}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">First Name</label>
              <input
                type="hidden"
                name="reinsurer_id"
                ref={register({ required: true })}
                value={details?.reinsurer_id}
              />
              <input
                name="first_name"
                ref={register({ required: "Required" })}
                type="text"
                className="form-control"
                placeholder="First Name"
              />
              {errors.first_name && (
                <p className="text-danger">{errors.first_name.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Last Name</label>
              <input
                name="last_name"
                ref={register({ required: "Required" })}
                type="text"
                className="form-control"
                placeholder="Last Name"
              />
              {errors.last_name && (
                <p className="text-danger">{errors.last_name.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                name="email"
                ref={register({ required: "Required" })}
                type="email"
                className="form-control"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
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
              <label htmlFor="">Primary Phone number</label>
              <input
                name="phone_pri"
                ref={register({ required: "Required" })}
                type="text"
                className="form-control"
                placeholder="Primary Phone number"
              />
              {errors.phone_pri && (
                <p className="text-danger">{errors.phone_pri.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Secondary Phone number</label>
              <input
                name="phone_sec"
                ref={register({ required: false })}
                type="text"
                className="form-control"
                placeholder="Secondary Phone number"
              />
              {errors.phone_sec && (
                <p className="text-danger">{errors.phone_sec.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <select
                className="form-control"
                name="position"
                ref={register({ required: "Required" })}
              >
                <option value="">choose a position</option>
                <option value="Manager">Manager</option>
                <option value="Underwriter">Underwriter</option>
              </select>
              {errors.position && (
                <p className="text-danger">{errors.position.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group d-flex justify-content-end">
              <button type="submit" className="btn btn-sm btn-primary w-md">
                Add Associate
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAssociate;
