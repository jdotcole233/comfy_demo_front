/* eslint-disable no-throw-literal */
import React, { useState } from "react";
import styles from "../styles/ViewInsurerOffer.module.css";
import { Alert } from "react-bootstrap";
import { useMutation, useQuery } from "react-apollo";
import { CREATE_DISTRIBUTION_LIST_DATA } from "../../../graphql/queries";
import { Selector } from "../../../components";
import {
  CREATE_TREATY_DISTRIBUTION,
  TREATY,
} from "../../../graphql/queries/treaty";
import swal from "sweetalert";
import { useMemo } from "react";

const buildSelectRows = (data) => {
  const list = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    for (
      let innerIndex = 0;
      innerIndex < element.reinsurer_representatives.length;
      innerIndex++
    ) {
      const obj = element.reinsurer_representatives[innerIndex];
      // console.log(obj.reinsurer_representative_id)
      const item = {
        label: `${obj?.reinsurer.re_company_name} - ${obj.rep_first_name} ${obj.rep_last_name}`,
        value: obj,
      };
      list.push(item);
    }
  }
  return list;
};

const buildRepsData = (data) => {
  const list = [];
  data.map((reinsurer_rep) => {
    const index = list.find(
      (rep) => rep.reinsurer_id === reinsurer_rep.reinsurersreinsurer_id
    );
    if (index) {
      index.representatives_ids.push(reinsurer_rep.reinsurer_representative_id);
    } else {
      const newRep = {
        reinsurer_id: reinsurer_rep.reinsurersreinsurer_id,
        representatives_ids: [reinsurer_rep.reinsurer_representative_id],
      };
      list.push(newRep);
    }
    return reinsurer_rep;
  });
  return list;
};

export default function CreateBroadcastList({ treaty_id, toggle, treaty }) {
  const [reps, setBroadcastList] = useState([]);
  const [selectdQuarter, setSelectdQuarter] = useState(null);

  const [repData, setRepData] = useState([]);
  const { data } = useQuery(CREATE_DISTRIBUTION_LIST_DATA);

  const [createDistribution] = useMutation(CREATE_TREATY_DISTRIBUTION, {
    refetchQueries: [{ query: TREATY, variables: { treaty_id } }],
  });
  const __limits = JSON.parse(treaty?.layer_limit || "[]").map((_, key) => ({
    label: `Layer ${key + 1}`,
    value: key + 1,
  }));
  const limits = __limits.length
    ? [{ label: "All", value: "0" }, ...__limits]
    : __limits;
  const options = useMemo(() => {
    let list = [];
    if (data) {
      list = buildSelectRows(data?.reinsurers);
    }
    return list;
  }, [data]);

  const handleAddRep = (data) => {
    if (data) {
      setBroadcastList([
        ...reps.filter((rep) => rep !== data.label),
        data.label,
      ]);
      setRepData([
        ...repData.filter(
          (rep) =>
            rep.reinsurer_representative_id !==
            data.value.reinsurer_representative_id
        ),
        data.value,
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
          repData.reinsurer_representative_id !==
          associate?.value.reinsurer_representative_id
      ),
    ];
    setRepData(new_repData);
  };

  const handleCreateDistributionList = () => {
    if (
      treaty?.treaty_program?.treaty_type === "NONPROPORTIONAL" &&
      !selectdQuarter
    ) {
      return;
    }
    const ids = buildRepsData(repData);
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
          ids,
          treaty_id,
          layer_number:
            selectdQuarter?.value === "0"
              ? [...__limits.map((el) => el.value)]
              : [selectdQuarter?.value],
          treaty_associate_deduction_id:
            treaty?.treaty_deduction?.treaty_associate_deduction_id,
        },
      })
        .then((res) => {
          swal("Hurray", "Distribution List created successfully", "success");
          setBroadcastList([]);
          setRepData([]);
          toggle();
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
        <h2 className={styles.card_title}>Create Broadcast list</h2>
        <Alert variant="danger"></Alert>
      </div>
      <div className={styles.card_body}>
        {treaty?.treaty_program?.treaty_type === "NONPROPORTIONAL" && (
          <div className="form-group">
            <label htmlFor="">Layers</label>
            <Selector
              value={selectdQuarter}
              options={limits}
              onChange={(value) => setSelectdQuarter(value)}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="">Re-insurers - Reps</label>
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
