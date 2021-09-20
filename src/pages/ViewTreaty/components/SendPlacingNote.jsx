/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import styles from "../styles/inputOffer.module.css";
import { Dropzone, Modal, Datatable, Selector, Editor } from "../../../components";
import { useMutation, useQuery } from "react-apollo";
import { SEND_OFFER_AS_BROADCAST } from "../../../graphql/mutattions";
import swal from "sweetalert";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import JoditEditor from "jodit-react";
import PDF from "../../../assets/pdf.png";
import { responseFound } from "./columns";
import { SINGLE_OFFER } from "../../../graphql/queries";
import { EMPLOYEES } from "../../../graphql/queries/employees";

export const createOption = (label) => ({
  label,
  value: label,
});

export const validateEmails = (emails) => {
  let flag = true;
  for (let index = 0; index < emails.length; index++) {
    const element = emails[index];
    console.log("email" + index, element);
    if (emailRegex.test(element)) {
      flag = flag && true;
      console.log(true);
    } else {
      flag = flag && false;
      console.log(false);
    }
  }

  return flag;
};

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

function SendPlacingNote({
  offer_id,
  toggle,
  closed,
  noOfReinsurers = 0,
  noOfAssociates = 0,
}) {
  const { register, errors, handleSubmit, setError, clearError, reset } =
    useForm();
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState(false);
  const [files, setFiles] = useState([]);
  const [sendmail, { loading: mailSending }] = useMutation(
    SEND_OFFER_AS_BROADCAST,
    { refetchQueries: [{ query: SINGLE_OFFER, variables: { offer_id } }] }
  );
  const [should_send] = useState(0);
  const [inputvalue, setInputvalue] = useState("");
  const [copiedMails, setCopiedMails] = useState([]);
  const [selectedableEmail, setSelectedableEmail] = useState([]);
  const [receivedReps, setReceivedReps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [include_attachment, setInclude_attachment] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const { data: employees, loading } = useQuery(EMPLOYEES);

  useEffect(() => {
    if (employees) {
      const _emails = employees.employees.map((e) => ({
        label: e.employee_email,
        value: e.employee_email,
      }));
      setSelectedableEmail(_emails);
    }
  }, [employees]);

  useEffect(() => {
    if (!closed) {
      reset();
      setContent("");
      setFiles([]);
    }
  }, [closed, reset]);

  const handleKeyDown = (event) => {
    if (!inputvalue) return;
    // eslint-disable-next-line default-case
    switch (event.key) {
      case "Enter":
      case "Tab":
        setInputvalue("");
        setCopiedMails([...copiedMails, createOption(inputvalue)]);
        event.preventDefault();
    }
  };

  const handleInputChange = (event) => {
    setInputvalue(event);
  };

  const validateEmails = (emails) =>
    emails.every((email) => emailRegex.test(email.value));

  const handleCopiedmailChange = (value) => setCopiedMails(value ? value : []);

  useEffect(() => {
    if (copiedMails && copiedMails.length) {
      const validEmails = validateEmails(copiedMails);
      // alert(validEmails)
      validEmails
        ? clearError("copied_emails")
        : setError("copied_emails", "pattern", "Provide valid mails");
    }
  }, [copiedMails]);

  const handleSubmitSendMail = ({ subject, copied_emails }) => {
    // console.log(files);
    if (!validateEmails(copiedMails)) {
      setError("copied_emails", "pattern", "Provide valid mails");
      return;
    }
    // return;
    if (content.length < 1) {
      setContentError(true);
      return;
    } else {
      setContentError(false);
    }
    // return;
    const data = {
      offer_id,
      message_content: content,
      subject,
      copied_emails: copied_emails.length
        ? [...copiedMails.map((e) => e.label)]
        : [],
      attachment: [...files],
    };
    setData(data);
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to broadcast this mail?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      sendmail({
        variables: { data, should_send, include_attachment },
      })
        .then((res) => {
          if (res.data.sendOfferAsBroadCast) {
            toggle();
            swal.stopLoading();
            swal.close();
            setShowModal(true);
            setResponseData(JSON.parse(res.data.sendOfferAsBroadCast));
          } else {
            swal("Success", "Mail sent successfully", "success");
            setContent("");
            setFiles([]);
            setFiles([]);
            reset();
            toggle();
          }
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
            swal("Sorry!!", err.message.replace("GraphQL error:", ""), "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  const handleSendAgain = (should_send_input) => {
    sendmail({
      variables: { data, should_send: should_send_input, include_attachment },
    })
      .then((res) => {
        swal("Success", "Mail sent successfully", "success");
        // toggle();
        setContent("");
        setFiles([]);
        setFiles([]);
        reset();
        setShowModal(false);
      })
      .catch((err) => {
        if (err) {
          // console.log(err)
          swal("Oh noes!", "The AJAX request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  };

  useEffect(() => {
    if (responseData) {
      const list = responseData.associates.map((associates) => ({
        reinsurer: associates.reinsurer,
        rep_name: associates.rep_name,
        status: (
          <span className="badge badge-success" style={{ letterSpacing: 3 }}>
            Sent
          </span>
        ),
      }));
      setReceivedReps(list);
    }
  }, [responseData]);

  return (
    <>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Send Placing Note</h2>
        <Alert variant="danger">
          <strong>
            Send offer to {noOfReinsurers} reinsurers with {noOfAssociates}{" "}
            Associates
          </strong>
          <p>
            N.B: You can include any number of EMAILS. Press ENTER or TAB key to
            add more{" "}
          </p>
        </Alert>
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitSendMail)}
        className={styles.card_body}
      >
        <div className="form-group row mb-4">
          <label htmlFor="taskname" className="col-form-label col-lg-2">
            Subject
          </label>
          <div className="col-lg-10">
            <input
              id="taskname"
              ref={register({ required: "Required" })}
              name="subject"
              type="text"
              className="form-control"
              placeholder="Enter subject"
            />
            {errors.subject && (
              <p className="text-danger">{errors.subject.message}</p>
            )}
          </div>
        </div>
        <div className="form-group row mb-4">
          <label htmlFor="taskname" className="col-form-label col-lg-2">
            CC
          </label>
          <div className="col-lg-10">
            <Selector
              inputValue={inputvalue}
              onInputChange={handleInputChange}
              isMulti
              value={copiedMails}
              isLoading={loading}
              onChange={handleCopiedmailChange}
              onKeyDown={handleKeyDown}
              options={selectedableEmail}
            />
            <input
              type="hidden"
              ref={register({ required: "Required" })}
              value={copiedMails}
              name="copied_emails"
              className="form-control"
              placeholder="Enter recipients emails separated with commas"
            />
            {errors.copied_emails && (
              <p className="text-danger">{errors.copied_emails.message}</p>
            )}
          </div>
        </div>
        <div className="form-group row mb-4">
          <label className="col-form-label col-lg-2">Message</label>
          <div className="col-lg-10">
            {/* <SummerNote onChange={e => setContent(e)} /> */}
            {/* <JoditEditor value={content} onChange={value => setContent(value)} /> */}
            <Editor value={content} onChange={(value) => setContent(value)} />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-10">
            {contentError && <p className="text-danger">Required</p>}
          </div>
        </div>
        {/* <div className="form-group row mb-4">
                    <label className="col-form-label col-lg-2"></label>
                    <div className="col-lg-10">
                        <input className="ml-1 form-check-input" type="checkbox" name="" id="" />
                        <label className="ml-4 form-check-label" htmlFor="defaultCheck1">
                            Add facultative placement slip
                        </label>
                    </div>
                </div> */}
        <div className="form-group row mb-4">
          <label className="col-form-label col-lg-2">Attachment(s)</label>
          <div className="col-lg-10">
            <Dropzone
              closed={closed}
              onChange={(set) => setFiles(set)}
              multiple={true}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-form-label col-lg-2"></div>
          <div className="col-lg-10 d-flex justify-content-end">
            <button type="submit" className="btn btn-sm w-md btn-primary">
              Send Email
            </button>
          </div>
        </div>
      </form>
      <Modal
        centered
        size="lg"
        show={showModal}
        onHide={() => setShowModal(!showModal)}
      >
        <Modal.Header>Record found</Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <p>
              This offer has been sent to {receivedReps.length} associates along
              with the following attachments.
            </p>
            <p>
              <strong>Will you like to include them in this email ?</strong>
            </p>
          </Alert>
          <h6>Mail received by</h6>
          <Datatable entries={2} columns={responseFound} data={receivedReps} />
          {responseData && responseData.file_listing.length ? (
            <fieldset className="border p-1">
              <legend
                className="w-auto"
                style={{ fontSize: 14, fontWeight: "bold" }}
              >
                Attachments
              </legend>
              <div style={{ height: 150, overflow: "scroll" }}>
                <ul>
                  {responseData &&
                    responseData.file_listing.map((file, key) => (
                      <li key={key}>
                        <img
                          src={PDF}
                          style={{ height: 30, width: 30 }}
                          className="m-2"
                        />
                        {file}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  onChange={(e) => setInclude_attachment(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Include these attachment(s) to email
                </label>
              </div>
            </fieldset>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          {!mailSending ? (
            <>
              <button
                onClick={() => handleSendAgain(1)}
                className="btn btn-danger"
              >
                No
              </button>
              <button
                onClick={() => handleSendAgain(2)}
                className="btn btn-primary"
              >
                Yes
              </button>
            </>
          ) : (
            <button className="btn btn-primary w-md" disabled>
              <i className="bx bx-hourglass bx-spin mr-2"></i>
              Sending...
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SendPlacingNote;
