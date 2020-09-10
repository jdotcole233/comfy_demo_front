import React from 'react'
// import styles from './styles/inputOffer.module.css'

const styles = {}

export default function InputOffer() {
    return (
        <>
            <div className={styles.card_header}>
                <h2 className={styles.card_title}>Create facultative placement slip</h2>
            </div>
            <div className={styles.card_body}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="BusinessClass">Insurance Company</label>
                            <select name="business_class" id="" className="form-control">
                                <option value="">Select insurance company</option>
                                <option value="Marine Cargo">Marine Cargo</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="BusinessClass">Business Class</label>
                            <select name="business_class" id="" className="form-control">
                                <option value="">Select business class</option>
                                <option value="Marine Cargo">Marine Cargo</option>
                            </select>
                        </div>
                    </div>

                </div>
                <fieldset className="w-auto p-2 border">
                    <legend className={styles.details_title}>Business class details</legend>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Type of goods</label>
                                <input type="text" className="form-control" placeholder="Type of goods" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Clause</label>
                                <input type="text" className="form-control" placeholder="Clause" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Bill of lading no.</label>
                                <input type="text" className="form-control" placeholder="Bill of lading no." />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Sailing Date</label>
                                <input type="text" className="form-control" placeholder="Sailing Date" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Vesel Name</label>
                                <input type="text" className="form-control" placeholder="Vesel Name" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Routes</label>
                                <input type="text" className="form-control" placeholder="Routes" />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="w-auto p-2 border">
                    <legend className={styles.details_title}>Offer Details</legend>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Policy no.</label>
                                <input type="text" className="form-control" placeholder="Policy no." />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Insured</label>
                                <input type="text" className="form-control" placeholder="Insured" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Sum Insured</label>
                                <input type="text" className="form-control" placeholder="Sum Insured" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Rate</label>
                                <input type="text" className="form-control" placeholder="Rate" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Premium</label>
                                <input type="text" className="form-control" placeholder="Premium" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Facultative Offer</label>
                                <input type="text" className="form-control" placeholder="Facultative Offer" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Commision</label>
                                <input type="text" className="form-control" placeholder="Commision" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Brokerage</label>
                                <input type="text" className="form-control" placeholder="Brokerage" />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Currency</label>
                                <select name="" className="form-control" id="">
                                    <option value="USD">USD</option>
                                    <option value="GHC">GHC</option>
                                    <option value="GBP">GBP</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="w-auto p-2 border">
                    <legend className={styles.details_title}>Period Of Insurance</legend>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">From</label>
                                <input type="date" className="form-control" placeholder="From" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">To</label>
                                <input type="date" className="form-control" placeholder="To" />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="w-auto p-2 border">
                    <legend className={styles.details_title}>Comment</legend>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <textarea rows={10} type="date" className="form-control" placeholder="Add Comment" ></textarea>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div className="form-group">
                    <input type="button" className="btn btn-primary btn-sm form-control my-2" value="Create offer" />
                </div>
            </div>
        </>
    )
}
