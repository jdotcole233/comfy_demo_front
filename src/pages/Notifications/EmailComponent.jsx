/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import PDF from "../../assets/pdf.png";

const EmailComponent = ({ data }) => {
  const [email, setEmail] = useState(null);
  useEffect(() => {
    if (data) {
      const __email = atob(
        JSON.parse(data.system_notification.notification_content).data
      );
      console.log(JSON.parse(__email));
      setEmail(JSON.parse(__email));
    }
  }, [data]);

  return (
    <div className="container-fluid">
      <div className="row alert alert-warning">
        {JSON.parse(data?.system_notification?.notification_content)?.message}
      </div>
      <div className="row">
        <table className="table table-borderless">
          <tbody>
            {/* <tr>
              <td>
                <strong>Policy Number </strong>
              </td>
              <td>YUR78484884</td>
            </tr> */}
            <tr>
              <td>
                {" "}
                <strong>Type of email </strong>
              </td>
              <td>{email?.type}</td>
            </tr>
            <tr>
              <td>
                <strong>Created On</strong>
              </td>
              <td>
                {new Date(
                  data?.system_notification?.created_at
                ).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                <strong>To</strong>
              </td>
              <td>
                {email?.recipient?.company_name || email?.recipient?.re_company_name} {`<${email?.recipient?.email || email?.recipient?.associate_email?.join(", ")}>`}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Cc</strong>
              </td>
              <td>{email?.other_recipients?.join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row"></div>

      <div className="row">
        <div className="col-md-12">
          <p style={{ fontVariant: "small-caps", fontWeight: "bolder" }}>
            Message
          </p>
        </div>
        <div
          className="col-md-12"
          dangerouslySetInnerHTML={{ __html: email?.message_content }}
        ></div>
      </div>
      <div className="row">
        {email?.attachments && (
          <div className="col-md-12 mb-2">
            <p style={{ fontVariant: "small-caps", fontWeight: "bolder" }}>
              Attachments
            </p>
          </div>
        )}
        <div className="col-md-12">
          <ul style={{ listStyle: "none" }}>
            {email?.attachments?.map((file, key) => (
              <li style={{ marginLeft: -50 }} key={key}>
                <img
                  src={PDF}
                  style={{ height: 30, width: 30 }}
                  className="m-2"
                />
                {file.file_name}{" "}
                <a target="_blank" href={`${file.downloadblelink}`}>
                  download
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailComponent;
