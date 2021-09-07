import React from "react";
import { useMutation } from "react-apollo";
import { BsInfoSquareFill } from "react-icons/bs";
import swal from "sweetalert";
import {
  DELETE_ADJUSTMENT_STATEMENT,
  TREATY,
} from "../../../graphql/queries/treaty";

const DeleteAdjustmentStatement = ({
  onClose,
  treaty_id,
  treaty_np_detail_id,
}) => {
  const [remove, { loading }] = useMutation(DELETE_ADJUSTMENT_STATEMENT, {
    variables: { treaty_id, treaty_np_detail_id },
    refetchQueries: [{ query: TREATY, variables: { treaty_id } }],
  });

  const onRemove = () => {
    remove()
      .then((res) => {
        swal(
          "Hurray!!",
          "Adjustment Statement removed successfully",
          "success"
        );
        onClose();
      })
      .catch((err) => {
        swal("Whhoops!!", err.message, "error");
      });
  };

  // const loading = false;

  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "100%",
        }}
        className="col-md-4 bg-danger d-flex justify-content-center align-items-center"
      >
        <BsInfoSquareFill size={60} color="#fff" />
      </div>
      <div className="col-md-8 d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex text-dark">
          <h4 style={{ color: "#000" }}>
            Are you sure you want to remove this Adjustment Statement ?
          </h4>
        </div>
        <div className="d-flex">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline-danger btn-square btn-lg mr-2"
          >
            No don't remove
          </button>
          <button
            onClick={onRemove}
            disabled={loading}
            type="button"
            className="btn btn-danger btn-lg"
          >
            {loading ? (
              <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
              </div>
            ) : (
              "Yes Remove"
            )}
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAdjustmentStatement;
