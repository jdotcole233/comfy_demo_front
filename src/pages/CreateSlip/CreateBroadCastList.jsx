/* eslint-disable no-throw-literal */
import React, { useState, useEffect, useContext } from 'react'
import styles from './styles/inputOffer.module.css'
import { Alert } from 'react-bootstrap'
import { useMutation, useQuery } from 'react-apollo'
import { CREATE_DISTRIBUTION_LIST_DATA, SINGLE_OFFER } from '../../graphql/queries';
import { Selector } from '../../components'
import { CREATE_DISTRIBUTION_LIST } from '../../graphql/mutattions';
import swal from 'sweetalert';
import { DrawerContext } from '../../components/Drawer';




export default function CreateBroadcastList({ offer_id, toggle }) {
    const { closed } = useContext(DrawerContext);
    const [reps, setBroadcastList] = useState([]);
    const [repData, setRepData] = useState([]);
    const { data } = useQuery(CREATE_DISTRIBUTION_LIST_DATA);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (closed) {
            setBroadcastList([])
        }
    }, [closed])
    const [createList] = useMutation(CREATE_DISTRIBUTION_LIST, {
        refetchQueries: [{ query: SINGLE_OFFER, variables: { offer_id } }]
    });

    useEffect(() => {
        if (data) {
            console.log(data)
            const options_v = buildSelectRows(data.reinsurers);
            setOptions(options_v)
        }
    }, [data])

    const handleRemoveRep = rep => {
        //find given rep from options
        const new_reps = [...reps.filter(rep_v => rep_v !== rep)];
        setBroadcastList(new_reps);
        const associate = options.find(option => option.label === rep);
        const new_repData = [...repData.filter(repData => repData.reinsurer_representative_id !== associate.value.reinsurer_representative_id)];
        console.log(new_repData)
        setRepData(new_repData)
    }

    const handleAddRep = data => {
        if (data) {
            setBroadcastList([...reps.filter(rep => rep !== data.label), data.label])
            setRepData([...repData.filter(rep => rep.reinsurer_representative_id !== data.value.reinsurer_representative_id), data.value])
        }

    }

    const buildRepsData = (data) => {
        const list = [];
        data.map(reinsurer_rep => {
            const index = list.find(rep => rep.reinsurer_id === reinsurer_rep.reinsurersreinsurer_id);
            if (index) {
                index.representatives_ids.push(reinsurer_rep.reinsurer_representative_id);
            } else {
                const newRep = {
                    reinsurer_id: reinsurer_rep.reinsurersreinsurer_id,
                    representatives_ids: [reinsurer_rep.reinsurer_representative_id]
                }
                list.push(newRep);
            }
            return reinsurer_rep;
        })
        return list;
    }


    const buildSelectRows = data => {
        const list = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            for (let innerIndex = 0; innerIndex < element.reinsurer_representatives.length; innerIndex++) {
                const obj = element.reinsurer_representatives[innerIndex]
                const item = {
                    label: `${obj?.reinsurer.re_company_name} - ${obj.rep_first_name} ${obj.rep_last_name}`,
                    value: obj
                }
                list.push(item)
            }

        }
        return list;
    }

    const handleCreateDistributionList = event => {
        const reinsurer_reps = buildRepsData(repData);
        swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            icon: "warning",
            title: "Are you sure you want to create this list ?",
            buttons: ["No", {
                text: "Yes",
                closeModal: false
            }]
        }).then(event => {
            if (!event) throw null;
            createList({
                variables: {
                    reinsurer_reps,
                    offer_id
                }
            }).then(res => {
                swal("Hurray", "Distribution List created successfully", "success");
                setBroadcastList([]);
                setRepData([]);
                toggle()
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
                <h2 className={styles.card_title}>Create Broadcast list</h2>
                <Alert variant="danger">
                    <strong>A copy of the offer will be sent to the list of associates to be created below</strong>
                </Alert>
            </div>
            <div className={styles.card_body}>
                <div className="form-group">
                    <label htmlFor="">Re-insurers - Reps</label>
                    <Selector options={options} onChange={handleAddRep} />
                </div>
                <div className="container-fluid" >
                    <div style={{ height: 420, overflowY: "scroll" }}>
                        {reps.map((associate, key) => {
                            return (
                                <RepCard key={key} rep={associate} remove={handleRemoveRep} />
                            )
                        })
                        }
                    </div>
                    <div className="form-group">
                        <input disabled={!reps.length} onClick={handleCreateDistributionList} type="submit" name="" id="" className="form-control btn btn-primary mt-2" />
                    </div>
                </div>
            </div>
        </>
    )
}


const RepCard = ({ rep, remove }) => {
    return (
        <div className={styles.repCard} >
            <div className="text-white">
                <h6 style={{ fontWeight: "lighter", color: "#fff" }}>{rep}</h6>
            </div>
            <div style={{
                fontSize: 20,
                color: "#fff",
                backgroundColor: "red",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30
            }} onClick={() => remove(rep)} >X</div>
        </div>
    )
}