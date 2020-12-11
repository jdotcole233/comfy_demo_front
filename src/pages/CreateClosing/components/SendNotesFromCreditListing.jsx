/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useContext, useEffect } from 'react'
import styles from '../styles/inputOffer.module.css'
import { useMutation, useQuery } from 'react-apollo';
import { Editor, Selector } from '../../../components'
import { SEND_CHANGES_AND_CLOSING_SLIP } from '../../../graphql/mutattions';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-bootstrap'
import { DrawerContext } from '../../../components/Drawer';
import { EMPLOYEES } from '../../../graphql/queries/employees';
import { FaCheck } from 'react-icons/fa';
import cx from 'classnames'


const createOption = (label) => ({
    label,
    value: label,
});

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

function SendEndorsementNotesFromCreditNotesListing({ reinsurer, endorsement, toggle, index }) {
    const { closed } = useContext(DrawerContext)
    const { register, errors, handleSubmit, setError, clearError, reset } = useForm()
    const [contentError, setContentError] = useState(false);
    const [inputvalue, setInputvalue] = useState("")
    const [copiedMails, setCopiedMails] = useState([])
    const [selectedableEmail, setSelectedableEmail] = useState([])
    const [documents, setDocuments] = useState([])
    const [content, setContent] = useState("")
    // const [emails, setEmails] = useState("")
    const { data: employees, loading } = useQuery(EMPLOYEES)

    const [sendmail] = useMutation(SEND_CHANGES_AND_CLOSING_SLIP);


    useEffect(() => {
        if (employees) {
            const _emails = employees.employees.map(e => ({ label: e.employee_email, value: e.employee_email }))
            setSelectedableEmail(_emails)
        }
    }, [employees])

    useEffect(() => {
        if (closed) {
            reset();
            setContent("");
            // setEmails("");
        }
    }, [closed, reset])

    const handleKeyDown = (event) => {
        if (!inputvalue) return;
        // eslint-disable-next-line default-case
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setInputvalue("");
                setCopiedMails([...copiedMails, createOption(inputvalue)])
                event.preventDefault();
        }
    };

    const handleInputChange = event => {
        setInputvalue(event)
    }

    const validateEmails = emails => emails.every(email => emailRegex.test(email.value))


    const handleCopiedmailChange = value => setCopiedMails(value ? value : [])


    useEffect(() => {
        if (copiedMails && copiedMails.length) {
            const validEmails = validateEmails(copiedMails);
            validEmails ? clearError("copied_emails") : setError("copied_emails", "pattern", "Provide valid mails")
        }
    }, [copiedMails])


    const handleSubmitSendMail = ({ subject, copied_emails }) => {
        if (content.length < 1) {
            setContentError(true);
            return;
        } else {
            setContentError(false);
        }
        const data = {
            // reinsurer_id: reisnsurer?.reinsurer.reinsurer_id,
            offer_endorsement_id: endorsement?.offer_endorsement_id,
            email_content: content,
            doc_number: index,
            offer_participant_id: reinsurer?.offer_participant_id,
            subject,
            documents,
            copied_email: [...copiedMails.map(e => e.label)],
        };
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Are you sure ?",
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw null;
            sendmail({
                variables: { data }
            }).then(res => {
                swal("Success", "Mail sent successfully", 'success');
                setContent("");
                reset();
                toggle();
            }).catch(err => {
                if (err) {
                    // console.log(err)
                    swal("Oh noes!", "The AJAX request failed!", "error");
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            })
        })
    }
    return (
        <>
            <div className={styles.card_header}>
                <h2 className={styles.card_title}>Send Endorsement Contract Changes & Closing Slip</h2>
                <Alert variant="danger">
                    <p>This session will send a copy of Endorsement Contract Changes, Closing Slip or both to <strong>{reinsurer?.re_company_name}</strong>  as attachment</p>
                    <p>N.B: You can include any number of EMAILS. Press ENTER or TAB key to add more </p>
                </Alert>
            </div>
            <fieldset style={{ borderColor: "#red", borderWidth: 2 }} className="w-auto border">
                <legend className={styles.details_title}>Select Document descent</legend>
                <DocTypes onChange={(docs) => setDocuments(docs)} />
            </fieldset>
            {documents.length > 0 && <form onSubmit={handleSubmit(handleSubmitSendMail)} className={cx(styles.card_body)}>
                <div className="form-group row mb-4">
                    <label className="col-form-label col-lg-2">Subject</label>
                    <div className="col-lg-10">
                        <input ref={register({ required: "Required" })} name="subject" type="text" className="form-control" placeholder="Enter subject" />
                        {errors.subject && <p className="text-danger">{errors.subject.message}</p>}
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <label className="col-form-label col-lg-2">CC</label>
                    <div className="col-lg-10">
                        <Selector inputValue={inputvalue} onInputChange={handleInputChange} isMulti value={copiedMails} isLoading={loading} onChange={handleCopiedmailChange} onKeyDown={handleKeyDown} options={selectedableEmail} />
                        <input type="hidden" ref={register({ required: "Required" })} value={copiedMails} name="copied_emails" className="form-control" placeholder="Enter recipients emails separated with commas" />
                        {errors.copied_emails && <p className="text-danger">{errors.copied_emails.message}</p>}
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <label className="col-form-label col-lg-2">Message</label>
                    <div className="col-lg-10">
                        {/* <JoditEditor value={content} onChange={value => setContent(value)} /> */}
                        <Editor value={content} onChange={value => setContent(value)} />
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                        {contentError && <p className="text-danger">Required</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-form-label col-lg-2"></div>
                    <div className="col-lg-10 d-flex justify-content-end">
                        <button type="submit" className="btn btn-sm w-md btn-primary">Send Email</button>
                    </div>
                </div>

            </form>}
        </>
    )
}

export default SendEndorsementNotesFromCreditNotesListing


const DocTypes = ({ onChange }) => {
    const [selectedDocs, setSelectedDocs] = useState([]);

    const handleClicked = (value) => {
        setSelectedDocs(prev => {
            if (prev.includes(value)) {
                const outcome = prev.filter(el => el !== value);
                onChange && onChange(outcome);
                return outcome;
            } else {
                const outcome = [...prev, value]
                onChange && onChange(outcome);
                return outcome
            }
        })
    }

    return (
        <div className="d-flex justify-content-around">
            <DocPill active={selectedDocs.includes("Contract Changes")} onClick={handleClicked} name="Contract Changes" value="Contract Changes" />
            <DocPill active={selectedDocs.includes("Closing Slip")} onClick={handleClicked} name="Closing Slip" value="Closing Slip" />
        </div>
    )
}

const DocPill = ({ name, value, onClick, active }) => (
    <div onClick={() => onClick(value)} className={`bg-gray`}>
        <div className={`${active ? "round-circle-active" : "round-circle"}`}>
            <FaCheck width={15} color="#fff" />
        </div>
        <div className="highlight-text">
            {name} <span style={{ fontWeight: "bold", marginLeft: 10 }}>{active ? " Selected" : ""}</span>
        </div>
    </div>
)
