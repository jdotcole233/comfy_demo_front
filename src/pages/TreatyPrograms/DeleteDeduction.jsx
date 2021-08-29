import React from "react";
import { useMutation } from "react-apollo";
import { BsInfoSquareFill } from "react-icons/bs";
import swal from "sweetalert";
import { DELETE_TREATY_DEDUCTION } from "../../graphql/queries/treaty";

const DeleteDeduction = ({ onClose, deduction }) => {
  const [remove, { loading }] = useMutation(DELETE_TREATY_DEDUCTION, {
    variables: {
      id: deduction?.treaty_associate_deduction_id,
    },
  });

  const handleDelete = () => {
    alert(JSON.stringify(deduction));
    remove()
      .then((_) => {
        onClose();
        swal("Hurray!!", "Deduction removed successfully", "success");
      })
      .catch((err) => {
        swal("whoops!!", "Deduction not removed successfully", "error");
      });
  };

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
            Are you sure you want to delete this Deduction ?
          </h4>
        </div>
        <div className="d-flex">
          <button
            disabled={loading}
            type="button"
            onClick={onClose}
            className="btn btn-outline-danger btn-square btn-lg mr-2"
          >
            No don't delete
          </button>
          <button
            disabled={loading}
            onClick={handleDelete}
            type="button"
            className="btn btn-danger btn-lg"
          >
            {loading && (
              <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
              </div>
            )}
            {!loading && "Yes delete"}
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDeduction;
