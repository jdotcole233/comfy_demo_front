/* eslint-disable default-case */
/* eslint-disable no-throw-literal */
import React, { useState, useContext, useEffect } from 'react'
import styles from './styles/inputOffer.module.css'
import JoditEditor from "jodit-react";
import { Alert } from 'react-bootstrap'
import { SEND_DEBIT_AND_CREDIT } from '../../graphql/mutattions';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import { DrawerContext } from '../../components/Drawer';
import { Selector } from '../../components'
import { useMutation, useQuery } from 'react-apollo';
import { EMPLOYEES } from '../../graphql/queries/employees'
import _ from 'lodash'


const createOption = (label) => ({
    label,
    value: label,
});

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

function CreateBroadcastEmail({ offer, toggle }) {
    const { data: employees, loading } = useQuery(EMPLOYEES)
    const { closed } = useContext(DrawerContext)
    const [inputvalue, setInputvalue] = useState("")
    const [copiedMails, setCopiedMails] = useState([])
    const [selectedableEmail, setSelectedableEmail] = useState([])
    const { register, errors, handleSubmit, setError, clearError, reset } = useForm()
    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState(false);
    const [sendmail] = useMutation(SEND_DEBIT_AND_CREDIT);

    useEffect(() => {
        if (employees) {
            const _emails = _.map(employees.employees, (e) => ({ label: e.employee_email, value: e.employee_email }))
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

    const validateEmails = emails => emails.every(email => emailRegex.test(email.value))


    const handleCopiedmailChange = value => setCopiedMails(value ? value : [])


    useEffect(() => {
        if (copiedMails && copiedMails.length) {
            const validEmails = validateEmails(copiedMails);
            !validEmails ? setError("copied_emails", "pattern", "Provide valid mails") : clearError("copied_emails")
        }
    }, [clearError, copiedMails, setError])


    const handleSubmitSendMail = ({ subject }) => {
        if (content.length < 1) {
            setContentError(true);
            return;
        } else {
            setContentError(false);
        }
        const data = { offer_id: offer?.offer_id, message_content: content, subject, copied_emails: [...copiedMails.map(e => e.value)] };
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Are you sure?",
            text: "You want to send this debit and cover note",
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw null;
            sendmail({
                variables: { data }
            }).then(res => {
                swal("Hurray!!", "Mail sent successfully", 'success');
                setContent("");
                reset()
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
                <h2 className={styles.card_title}>Send Cover And Debit Note</h2>
                <Alert variant="danger">
                    <p>This session will send copies of both cover and debit notes to <strong>{offer?.insurer.insurer_company_name}</strong>  as attachment</p>
                    <p>N.B: You can include any number of EMAILS. Press ENTER or TAB key to add more </p>
                </Alert>
            </div>
            <form onSubmit={handleSubmit(handleSubmitSendMail)} className={styles.card_body}>
                <div className="form-group row mb-4">
                    <label htmlFor="taskname" className="col-form-label col-lg-2">Subject</label>
                    <div className="col-lg-10">
                        <input ref={register({ required: "Required" })} name="subject" type="text" className="form-control" placeholder="Enter subject" />
                        {errors.subject && <p className="text-danger">{errors.subject.message}</p>}
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <label htmlFor="taskname" className="col-form-label col-lg-2">CC</label>
                    <div className="col-lg-10">
                        <Selector inputValue={inputvalue} onInputChange={handleInputChange} isMulti value={copiedMails} isLoading={loading} onChange={handleCopiedmailChange} onKeyDown={handleKeyDown} options={selectedableEmail} />
                        <input type="hidden" ref={register({ required: "Required" })} value={copiedMails} name="copied_emails" className="form-control" placeholder="Enter recipients emails separated with commas" />
                        {errors.copied_emails && <p className="text-danger">{errors.copied_emails.message}</p>}
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <label className="col-form-label col-lg-2">Message</label>
                    <div className="col-lg-10">
                        <JoditEditor value={content} onChange={value => setContent(value)} />
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

            </form>
        </>
    )
}

export default CreateBroadcastEmail

