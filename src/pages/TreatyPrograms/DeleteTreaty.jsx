import React from "react";
import { useMutation } from "react-apollo";
import { BsInfoSquareFill } from "react-icons/bs";
import { DELETE_TREATY_PROGRAM, TREATIES } from "../../graphql/queries/treaty";

const DeleteTreaty = ({ onClose, id }) => {
  const [remove, { loading }] = useMutation(DELETE_TREATY_PROGRAM, {
    variables: { id },
    refetchQueries: [{ query: TREATIES }],
  });

  const onRemove = () => {
    remove()
      .then((res) => {
        onClose && onClose();
      })
      .catch((err) => {});
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
            Are you sure you want to delete this treaty ?
          </h4>
        </div>
        <div className="d-flex">
          <button
            type="button"
            onClick={onClose}
            class="btn btn-outline-danger btn-square btn-lg mr-2"
          >
            No don't delete
          </button>
          <button
            onClick={onRemove}
            disabled={loading}
            type="button"
            class="btn btn-danger btn-lg"
          >
            {loading ? (
              <div class="spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
              </div>
            ) : (
              "Yes Delete"
            )}
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTreaty;
