/* eslint-disable no-throw-literal */
import React, { useState } from "react";
import styles from "../styles/ViewInsurerOffer.module.css";
import { Alert } from "react-bootstrap";
import { useMutation, useQuery } from "react-apollo";
import { Selector } from "../../../components";
import { TREATY } from "../../../graphql/queries/treaty";
import swal from "sweetalert";
import { useMemo } from "react";
import { BROKER_DISTRIBUTION_LIST } from "../../../graphql/queries/brokers";
import { CREATE_BROKER_DISTRIBUTION_LIST } from "../../../graphql/mutattions/brokers";

const buildSelectRows = (data) => {
  const list = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    for (
      let innerIndex = 0;
      innerIndex < element?.re_broker_associates.length;
      innerIndex++
    ) {
      const obj = element.re_broker_associates[innerIndex];
      const item = {
        label: `${element?.re_broker_name} - ${obj?.re_broker_assoc_first_name} ${obj?.re_broker_assoc_last_name}`,
        value: { ...obj, re_broker_id: element?.re_broker_id },
      };
      list.push(item);
    }
  }
  return list;
};

const buildRepsData = (data) => {
  const list = [];
  data.map((broker_rep) => {
    const index = list.find(
      (rep) => rep?.re_broker_id === broker_rep?.value?.re_broker_id
    );
    // console.log(broker_rep);
    if (index) {
      index.representatives_ids.push(broker_rep?.re_broker_associate_id);
    } else {
      const newRep = {
        re_broker_id: broker_rep?.re_broker_id,
        re_associate_ids: [broker_rep?.re_broker_associate_id],
      };
      list.push(newRep);
    }
    return broker_rep;
  });
  return list;
};

export default function CreateTreatyBrokersList({
  treaty_id,
  setShow,
  treaty,
}) {
  const [reps, setBroadcastList] = useState([]);

  const [repData, setRepData] = useState([]);
  const { data } = useQuery(BROKER_DISTRIBUTION_LIST);

  const [createDistribution] = useMutation(CREATE_BROKER_DISTRIBUTION_LIST, {
    refetchQueries: [{ query: TREATY, variables: { treaty_id } }],
  });
  // const __limits = JSON.parse(treaty?.layer_limit || "[]").map((_, key) => ({
  //   label: `Layer ${key + 1}`,
  //   value: key + 1,
  // }));
  // const limits = __limits.length
  //   ? [{ label: "All", value: "0" }, ...__limits]
  //   : __limits;
  const options = useMemo(() => {
    let list = [];
    if (data) {
      list = buildSelectRows(data?.brokers);
    }
    return list;
  }, [data]);

  const handleAddRep = (data) => {
    if (data) {
      setBroadcastList([
        ...reps.filter((rep) => rep !== data?.label),
        data.label,
      ]);
      setRepData([
        ...repData.filter(
          (rep) =>
            rep.re_broker_associate_id !== data?.value?.re_broker_associate_id
        ),
        data?.value,
      ]);
    }
  };

  const handleRemoveRep = (rep) => {
    //find given rep from options
    const new_reps = [...reps.filter((rep_v) => rep_v !== rep)];
    setBroadcastList(new_reps);
    const associate = [...options].find((option) => option.label === rep);
    const new_repData = [
      ...repData.filter(
        (repData) =>
          repData.re_broker_associate_id !==
          associate?.value.re_broker_associate_id
      ),
    ];
    setRepData(new_repData);
  };

  const handleCreateDistributionList = () => {
    const broke_distribution = buildRepsData(repData);
    // return;
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to create this list ?",
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((event) => {
      if (!event) throw null;
      createDistribution({
        variables: {
          brokers_list: { treaty_id, broke_distribution },
        },
      })
        .then((res) => {
          if (res.data.createReBrokerListForTreaty) {
            swal(
              "Success",
              "Distribution List created successfully",
              "success"
            );
            setBroadcastList([]);
            setRepData([]);
            setShow(false);
          } else {
            swal(
              "Error",
              "Distribution List could not be created successfully",
              "error"
            );
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  return (
    <>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Create Brokers Broadcast list</h2>
        <Alert variant="danger"></Alert>
      </div>
      <div className={styles.card_body}>
        <div className="form-group">
          <label htmlFor="">Brokers - Reps</label>
          <Selector value={null} options={options} onChange={handleAddRep} />
        </div>
        <div className="container-fluid">
          <div style={{ height: 400, overflowY: "scroll" }}>
            {reps.map((associate, key) => {
              return (
                <RepCard
                  key={key}
                  id={key}
                  rep={associate}
                  remove={handleRemoveRep}
                />
              );
            })}
          </div>
          <div className="form-group">
            <input
              disabled={!reps.length}
              onClick={handleCreateDistributionList}
              type="submit"
              name=""
              id=""
              className="form-control btn btn-primary mt-2"
            />
          </div>
        </div>
      </div>
    </>
  );
}

const RepCard = ({ rep, remove }) => {
  return (
    <div className="d-flex bg-primary justify-content-between align-items-center mb-2">
      <div className="bg-soft-primary d-flex align-items-center pl-3">
        <h6 style={{ fontWeight: "bold", color: "#fff" }}>{rep}</h6>
      </div>
      <div
        style={{
          fontSize: 20,
          color: "#fff",
          backgroundColor: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 30,
          height: 30,
        }}
        onClick={() => remove(rep)}
      >
        X
      </div>
    </div>
  );
};
