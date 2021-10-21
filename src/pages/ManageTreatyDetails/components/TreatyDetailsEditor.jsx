/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from "react";
// import { Alert } from "react-bootstrap";
import styles from "../../Insurers/styles/ViewInsurerOffer.module.css";
import { useForm } from "react-hook-form";
import { Selector, CurrencyOption, Editor, Loader } from "../../../components";
import currencies from "../../../assets/currencies.json";
import { useMutation, useQuery } from "@apollo/client";
import { TREATY } from "../../../graphql/queries/treaty";
import ErrorPage from "../../../components/ErrorPage";
import { UPDATE_TREATY_DETAILS } from "../../../graphql/mutattions/treaty";
import swal from "sweetalert";

const TreatyDetailsEditor = ({ parsedPayload, setLoader }) => {
  const { data, loading, error } = useQuery(TREATY, {
    variables: { treaty_id: parsedPayload.treaty_id },
  });
  const [update] = useMutation(UPDATE_TREATY_DETAILS);
  const [treatyDetials, setTreatyDetials] = useState([]);

  useEffect(() => {
    if (data && data?.treaty) {
      setTreatyDetials(JSON.parse(data?.treaty?.treaty_details));
    }
  }, [data]);

  const handleDetailsChange = (value, index) => {
    const inputs = [...treatyDetials];
    inputs[index]["value"] = value;
    console.log(inputs[index]);
    setTreatyDetials(inputs);
  };

  const handleCurrencyChange = (value, index) => {
    const inputs = [...treatyDetials];
    inputs[index]["value"] = value ? value.value.code : "";
    console.log(inputs[index]);
    setTreatyDetials(inputs);
  };

  const applyChanges = () => {
    swal({
      icon: "warning",
      title: "Apply changes?",
      text: "Changes will be applied after you click apply",
      buttons: ["No", { text: "apply", closeModal: false }],
    })
      .then((res) => {
        if (!res) return null;
        setLoader(false);
        update({
          variables: {
            treaty_id: parsedPayload.treaty_id,
            treaty_details: JSON.stringify(treatyDetials),
          },
        })
          .then((res) => {
            swal("Hurray!!", "Treaty details updated successfully", "success");
            setLoader(true);
          })
          .catch((error) => {
            swal(
              "Whhoops!!",
              "Treaty details not updated successfully",
              "error"
            );
          });
      })
      .catch(() => {});
  };

  if (loading) return <Loader />;

  if (error) return <ErrorPage />;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="card-title">Editor</div>
        <button onClick={applyChanges} className="btn btn-success">
          Apply changes
        </button>
      </div>
      <div
        className="card-body"
        style={{ height: window.innerHeight - 100, overflow: "scroll" }}
      >
        <form>
          <fieldset className="w-auto p-2 border">
            <legend className={styles.details_title}>Treaty details</legend>
            <div className="row">
              {treatyDetials?.map((cob, key) => {
                if (cob.keydetail.toLowerCase() === "currency") {
                  return (
                    <div className="col-md-12" key={key}>
                      <div className="form-group">
                        <label htmlFor="Type of goods">{cob.keydetail}</label>
                        <Selector
                          value={
                            cob.value
                              ? {
                                  label: Object.values(currencies).find(
                                    (eel) => eel.code === cob.value
                                  )?.name,
                                }
                              : ""
                          }
                          components={{ Option: CurrencyOption }}
                          onChange={(value) => handleCurrencyChange(value, key)}
                          options={[
                            ...Object.values(currencies).map((currency) => ({
                              label: currency.name,
                              value: currency,
                            })),
                          ]}
                        />
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="col-md-12" key={key}>
                    <div className="form-group">
                      <label htmlFor="Type of goods">{cob.keydetail}</label>
                      <Editor
                        value={cob.value}
                        onChange={(value) => handleDetailsChange(value, key)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default memo(TreatyDetailsEditor);
