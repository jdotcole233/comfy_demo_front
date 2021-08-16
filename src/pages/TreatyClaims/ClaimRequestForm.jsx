/* eslint-disable no-throw-literal */
import React, { useState, useEffect, useContext, useMemo } from 'react'
import styles from './styles/card.module.css'
import { Alert } from 'react-bootstrap'
import { Selector, Editor } from '../../components'
import { useMutation, useQuery } from 'react-apollo';
import { EMPLOYEES } from '../../graphql/queries/employees'
import { CLAIM_REQUEST } from '../../graphql/mutattions';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import { DrawerContext } from '../../components/Drawer';
import DropZone from '../../components/DropZone';
import { Select } from '../../components/Input';

const createOption = (label) => ({
    label,
    value: label,
});

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

function ClaimRequest({ offer, toggle, claims, participant }) {
    const { closed } = useContext(DrawerContext);
    const { data: employees, loading } = useQuery(EMPLOYEES)
    const [inputvalue, setInputvalue] = useState("")
    const [copiedMails, setCopiedMails] = useState([])
    const [selectedableEmail, setSelectedableEmail] = useState([])
    const { register, errors, handleSubmit, setError, clearError, reset } = useForm()
    const [content, setContent] = useState("")
    const [, setFiles] = useState([]);
    const [sendSingle, setSendSingle] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [sendmail] = useMutation(CLAIM_REQUEST);

    const pages = useMemo(() => {
        if (claims) {
            return claims.map((claim, key) => ({
                label: `Document ${key + 1}`,
                value: claim?.treaty_claim_id
            }))
        }
        return []
    }, [claims])

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
        }
    }, [closed, reset])

    const handleKeyDown = (event) => {
        if (!inputvalue) return;
        // eslint-disable-next-line default-case
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                console.log(copiedMails);
                setInputvalue("");
                setCopiedMails([...copiedMails, createOption(inputvalue)])
                event.preventDefault();
        }
    };

    const handleInputChange = event => {
        setInputvalue(event)
    }

    const validateEmails = emails => {
        let flag = true;
        for (let index = 0; index < emails.length; index++) {
            const element = emails[index];
            console.log("email" + index, element)
            if (emailRegex.test(element)) {
                flag = flag && true;
                console.log(true);
            } else {
                flag = flag && false;
                console.log(false)
            }
        }

        return flag;
    }

    const handleCopiedmailChange = value => {
        setCopiedMails(value ? value : [])
        handleEmailChange(value)
    }

    const handleEmailChange = emails => {
        const validEmails = emails.length ? validateEmails(emails) : false;
        if (!validEmails) {
            setError("copied_emails", "pattern", "Provide valid mails")
        } else {
            clearError("copied_emails")
        }
    }

    const handleSubmitSendMail = ({ subject }) => {
        if (content.length < 1) {
            setContentError(true);
            return;
        } else {
            setContentError(false);
        }
        const data = {
            offer_id: offer?.offer_id,
            message_content: content,
            subject,
            copied_emails: [...copiedMails.map(e => e.label)]
        };
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Are you sure you make a claim request ?",
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw null;
            sendmail({
                variables: { data }
            }).then(res => {
                swal("Hurray!!", "Mail sent successfully", 'success');
                reset()
                setContent("")
                toggle();
            }).catch(err => {
                if (err) {
                    console.log(err)
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
                <h2 className={styles.card_title}>Send Claim Document(s)</h2>
                <Alert variant="danger">
                    <p>This session will send copies of the  claim debit note to all associates of <strong>{participant?.reinsurer?.re_company_name}</strong></p>
                    <p>N.B: You can include any number of EMAILS. Press ENTER or TAB key to add more in "<i>cc</i>" section </p>
                </Alert>
            </div>
            <form onSubmit={handleSubmit(handleSubmitSendMail)} className={styles.card_body}>
                <div className="row mb-2">
                    <div className="col-md-2">
                        <label className="" htmlFor="">Single Doc.</label>
                    </div>
                    <div className="col-md-10 ">
                        <div onClick={() => setSendSingle(prev => !prev)} style={{ height: 10, width: 10, cursor: "pointer" }} className={`${sendSingle ? "bg-primary" : "bg-secondary"} p-2 rounded`}>
                            {/* {sendSingle && <FaCheck color="white" size={10} />} */}
                        </div>
                    </div>
                </div>
                {sendSingle &&
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <label className="" htmlFor=""></label>
                        </div>
                        <div className="col-md-10 ">
                            <Select options={pages} />
                        </div>
                    </div>
                }
                <div className="form-group row mb-4">
                    <label htmlFor="taskname" className="col-form-label col-lg-2">Subject</label>
                    <div className="col-lg-10">
                        <input id="taskname" ref={register({ required: "Required" })} name="subject" type="text" className="form-control" placeholder="Enter subject" />
                        {errors.subject && <p className="text-danger">{errors.subject.message}</p>}
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <label htmlFor="taskname" className="col-form-label col-lg-2">CC</label>
                    <div className="col-lg-10">
                        <Selector inputValue={inputvalue} onInputChange={handleInputChange} isMulti value={copiedMails} isLoading={loading} onChange={handleCopiedmailChange} onKeyDown={handleKeyDown} options={selectedableEmail} />
                        <input type="hidden" ref={register({ required: "Required" })} value={copiedMails} onChange={handleEmailChange} name="copied_emails" className="form-control" placeholder="Enter recipients emails separated with commas" />
                        {errors.copied_emails && <p className="text-danger">{errors.copied_emails.message}</p>}
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <label className="col-form-label col-lg-2">Message</label>
                    <div className="col-lg-10">
                        <Editor value={content} onChange={value => setContent(value)} />
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                        {contentError && <p className="text-danger">Required</p>}
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <label className="col-form-label col-lg-2">Attachment(s)</label>
                    <div className="col-lg-10">
                        <DropZone closed={closed} onChange={(set) => setFiles(set)} multiple={true} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-form-label col-lg-2"></div>
                    <div className="col-lg-10 d-flex justify-content-end">
                        <button type="submit" className="btn btn-sm w-md btn-primary">Send Email</button>
                    </div>
                </div>

            </form>
        </>
    )
}

export default ClaimRequest

