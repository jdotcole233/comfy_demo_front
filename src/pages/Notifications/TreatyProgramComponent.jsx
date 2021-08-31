import React from "react";

const BusinessComponent = ({ data }) => {
  const [business, setBusiness] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      console.log(data);
      const __offer = atob(
        JSON.parse(data.system_notification.notification_content).data
      );
      console.log(JSON.parse(__offer));
      const _offer = JSON.parse(__offer);
      setBusiness(_offer);
    }
  }, [data]);
  return (
    <div className="container-fluid">
      <div className="row alert alert-warning">
        {JSON.parse(data.system_notification.notification_content).message}
      </div>
      <div className="row">
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td>Treaty program name</td>
              <td>
                <strong>{business?.business_name}</strong>
              </td>
            </tr>
            <tr>
              <td>Created On</td>
              <td>
                <strong>
                  {new Date(data.system_notification.created_at).toDateString()}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {business && business?.business_details?.length && (
        <div className="row">
          <div className="col-md-12">
            <p>Business Details</p>
          </div>
          {JSON.parse(business?.business_details)?.map((detail, key) => (
            <Detail key={key} detail={detail} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessComponent;

const Detail = ({ detail }) => {
  return (
    <div className="text-dark row bg-soft-primary w-md p-2 mx-2 d-flex justify-content-center align-items-center">
      {detail.keydetail}
    </div>
  );
};
