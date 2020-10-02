/* eslint-disable no-throw-literal */
import React, { useState, useEffect, useContext } from 'react'
import styles from './styles/inputOffer.module.css'
import { Alert } from 'react-bootstrap'
import swal from 'sweetalert'
import { useMutation } from 'react-apollo'
import { CLOSE_OFFER } from '../../graphql/mutattions'
import { SINGLE_OFFER } from '../../graphql/queries'
import {useHistory} from 'react-router-dom'
import { DrawerContext } from '../../components/Drawer';





export default function InputOffer({ reinsurers, toggle, offer_id, policy_number, offer_status, offer_commission }) {
    
    const { closed } = useContext(DrawerContext);
    const [reinsurer_data, setReinsurer_data] = useState([]);
    const history = useHistory();
    
    useEffect(() => {
        if (closed) {
            
        }
    }, [closed])
    const [closeOffer] = useMutation(CLOSE_OFFER,{
        refetchQueries: [{ query: SINGLE_OFFER, variables: { offer_id } }]
    })
    
    useEffect(() => {
        if(reinsurers){
            const list = [];
            reinsurers.map((reinsurer) => {
                console.log(reinsurer)
                const row = {
                    name:reinsurer.reinsurer.re_company_name,
                    agreed_brokerage_percentage: 0,
                    agreed_commission: 0,
                    withholding_tax: 0,
                    nic_levy:0,
                    reinsurer_participant_id:reinsurer.offer_participant_id,
                    reinsurer_id:reinsurer.reinsurer.reinsurer_id,
                    hasPercentage: reinsurer.offer_participant_percentage > 0 
                }
                list.push(row);
                return row;
            })
            setReinsurer_data(list);
        }
    }, [reinsurers])

    const handleChange = (event, key) => {
        const {name, value} = event.target;
        const data = [...reinsurer_data];
        data[key][name] = value;
        setReinsurer_data(data);
    }


    const handleCloseOffer = event => {
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon:"warning",
            title: "Are you sure you want to close offer?",
            buttons: ["No",{
                text: "Yes",
                closeModal: false
            }]
        }).then(input => {
            if(!input) throw null;
            const data = reinsurer_data.map(el => {
                delete el.name
                delete el.hasPercentage
                return {
                    ...el, 
                    agreed_commission: el.agreed_commission || offer_commission
                };
            })
            console.log({
                offer_id,
                    data,
            })
            closeOffer({
                variables:{
                    offer_id,
                    data,
                }
            }).then(res => {
                swal({
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    icon:"success",
                    title:"Success",
                    text:"Offer closed successfully",
                    buttons:["Back to Offer listing", { text: "Go to closing list"}]
                }).then(input => {
                    if(!input) history.goBack();
                    setReinsurer_data([]);
                    toggle()
                    history.push("/admin/create-closing")
                });
                
            })
            .catch(err => {
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
                <h2 className={styles.card_title}>Close offer <span style={{ letterSpacing: 5 }} className={`badge badge-warning`}>{offer_status}</span></h2>
                <p>Policy number: {policy_number}</p>
                <div className="row">
                    <Alert variant="danger">
                     <p>
                     <strong>
                            If input field for company is 
                            left blank, then no with-holidng tax and NIC 
                        
                            levy will be charged to them
                        </strong>
                     </p>

                       <p>
                       <strong>
                            Leave agreed commission as 0 if you want the system to assign the initial commission for a particular reinsurer
                        </strong>
                        </p>
                    </Alert>
                </div>
            </div>
            <div className={styles.card_body}>
                {reinsurer_data.map((reinsurer, key) => !reinsurer.hasPercentage ? null : (
                    <fieldset key={key} className="w-auto p-2 border-form">
                        <legend className={styles.details_title}>{reinsurer.name}</legend>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Withholding Tax</label>
                                    <input name="withholding_tax" value={reinsurer.withholding_tax} onChange={(e) => handleChange(e, key)} min="0" type="number" className="form-control" placeholder="With-holding Tax" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">NIC levy</label>
                                    <input name="nic_levy" value={reinsurer.nic_levy} onChange={(e) => handleChange(e, key)} type="number" min="0" className="form-control" placeholder="NIC levy" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Agreed Brokerage</label>
                                    <input name="agreed_brokerage_percentage" value={reinsurer.agreed_brokerage_percentage} onChange={(e) => handleChange(e, key)} min="0" type="number" className="form-control" placeholder="Agreed Brokerage" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Agreed Commission</label>
                                    <input name="agreed_commission" value={reinsurer.agreed_commission} onChange={(e) => handleChange(e, key)} min="0" type="number" className="form-control" placeholder="Agreed Brokerage" />
                                </div>
                            </div>
                        </div>
                        
                    </fieldset>))}
                <div className="form-group">
                    <input onClick={handleCloseOffer} type="button" className="btn btn-primary btn-sm form-control my-2" value="Close offer" />
                </div>
            </div>


                    

        </>
    )
}
