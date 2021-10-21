import React, { useState } from 'react';
import { Modal, Selector } from "../../../components"
import list from "../../../assets/currencies.json";
import _ from "lodash";
import { DUPLICATE_TREATY } from '../../../graphql/mutattions/treaty';
import { TREATY } from '../../../graphql/queries/treaty';
import { useMutation } from '@apollo/client';
import swal from 'sweetalert';

const createOption = (label, value) => ({
    label,
    value,
});

const TreatyCurrency = ({ treaty }) => {
    const [showModal, setShowModal] = useState(false);
    const [currencies, setCurrencies] = useState(() => {
        const firstCurrency = JSON.parse(treaty?.treaty_details)?.find(el => el.keydetail === "currency").value;
        if (firstCurrency) {
            return [createOption(Object.values(list).find(
                (eel) => eel.code === firstCurrency
            )?.name, firstCurrency)];
        }
        return [];
    });
    const [inputvalue, setInputvalue] = useState("");

    const [duplicate] = useMutation(DUPLICATE_TREATY, {
        refetchQueries: [{ query: TREATY, variables: { treaty_id: treaty?.treaty_id } }]
    })

    const handleInputChange = (event) => {
        setInputvalue(event);
    };

    const handeCurrenciesChange = (value) => setCurrencies(value ? value : []);

    const handleKeyDown = (event) => {
        if (!inputvalue) return;
        // eslint-disable-next-line default-case
        switch (event.key) {
            case "Enter":
            case "Tab":
                setInputvalue("");
                setCurrencies(prev => [...prev, createOption(inputvalue, inputvalue)]);
                event.preventDefault();
        }
    };

    const handleDuplicate = () => {
        swal({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            buttons: ["No", { text: "Yes, duplicate it!", closeModal: false }],
            dangerMode: true,
            loading: true
        }).then((willDelete) => {
            if (willDelete) {
                duplicate({
                    variables: {
                        treaty_id: treaty?.treaty_id,
                        currencies: currencies.map(e => e.value),
                    }
                }).then(() => {
                    setShowModal(false);
                    swal(`Treaty Program has been created for the following currencies: ${currencies?.map(curr => curr.label).join(", ")}`, { icon: "success" });
                }).catch(() => {
                    swal("Oops!", "Something went wrong!", "error");
                });
            }
        })
    }

    return (
        <>
            <button onClick={() => setShowModal(true)} className="btn btn-primary btn-sm rounded-0">Treaty currency</button>

            <Modal centered size="lg" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Treaty currency</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {JSON.stringify(treaty?.treaty_details)} */}
                    <div className="row">
                        <div className="col-md-12">
                            <h2>{treaty?.treaty_program?.treaty_name} : {_.first(currencies)?.value ?? "N/A"}</h2>
                        </div>
                        <div className="col-md-12 ">
                            <div className="alert alert-danger"></div>
                        </div>
                        <div className="col-md-12 mt-1">
                            <div className="form-group">
                                <Selector
                                    inputValue={inputvalue}
                                    onInputChange={handleInputChange}
                                    isMulti
                                    value={currencies}
                                    onChange={handeCurrenciesChange}
                                    onKeyDown={handleKeyDown}
                                    options={[
                                        ...Object.values(list).map((currency) => ({
                                            label: currency.name,
                                            value: currency.code,
                                        })),
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={() => handleDuplicate()}>Create</button>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TreatyCurrency
