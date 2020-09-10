import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";
import { Drawer } from "../../../components";
import CreateBroadcastEmail from "../CreateBroadcastEmail";
import CreateBroadcastList from "../CreateBroadCastList";
import CloseOffer from "../CloseOffer";

const options = {
    series: [44, 55, 13, 33],
    labels: ["Reinsurer 1", "Reinsurer 2", "Reinsurer 3", "Reinsurer 4"],
};


const OfferDescriptionAndOptions = ({ data, state }) => {
    const [pieChartList, setPieChartList] = useState(null);
    const [showCreateList, setshowCreateList] = useState(false);
    const [broadCastEmail, setbroadCastEmail] = useState(false);
    const [showDrawerForClosingOffer, setShowDrawerForClosingOffer] = useState(
        false
    );


    useEffect(() => {
        if (data) {
            const series = [];
            const labels = [];
            data.findSingleOffer.offer_participant.map((reinsurer) => {
                series.push(reinsurer.offer_participant_percentage);
                labels.push(reinsurer.reinsurer.re_company_name);
                return null
            });
            if (series.length) {
                setPieChartList({
                    series,
                    labels,
                });
            }
        }
    }, [data]);

    return (
        <>
            <div className="col-xl-8">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="mr-3 align-self-center"></div>
                                    <div className="media-body">
                                        <p className="text-muted mb-2">
                                            Create Distribution list
                        </p>
                                        <button
                                            onClick={() => setshowCreateList(!showCreateList)}
                                            className="btn btn-primary btn-sm w-md"
                                        >
                                            Create List
                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="mr-3 align-self-center"></div>
                                    <div className="media-body">
                                        <p className="text-muted mb-2">Broadcast Email</p>
                                        <button
                                            disabled={!data?.findSingleOffer.offer_associates.length}
                                            onClick={() => setbroadCastEmail(!broadCastEmail)}
                                            className="btn btn-primary btn-sm w-md"
                                        >
                                            Send Emails
                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card mini-stats-wid">
                            <div className="card-body">
                                <div className="media">
                                    <div className="mr-3 align-self-center"></div>
                                    <div className="media-body">
                                        <p className="text-muted mb-2">Close Offer</p>
                                        <button
                                            disabled={["OPEN", "CLOSED"].includes(
                                                data?.findSingleOffer.offer_status
                                            )}
                                            onClick={() =>
                                                setShowDrawerForClosingOffer(
                                                    !showDrawerForClosingOffer
                                                )
                                            }
                                            className="btn btn-primary btn-sm w-md"
                                        >
                                            Completed
                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-3">Overview</h4>

                        <div>
                            <div id="overview-chart" className="apex-charts" dir="ltr">
                                {pieChartList ? (
                                    <Chart
                                        height="250"
                                        options={pieChartList}
                                        series={pieChartList.series}
                                        type="pie"
                                    />
                                ) : (
                                        <Chart
                                            height="250"
                                            options={options}
                                            series={options.series}
                                            type="pie"
                                        />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Drawer
                width={600}
                toggle={() => setshowCreateList(!showCreateList)}
                isvisible={showCreateList}
            >
                <CreateBroadcastList
                    offer_id={state?.offer_id}
                    toggle={() => setshowCreateList(!showCreateList)}
                />
            </Drawer>

            <Drawer
                toggle={() => setbroadCastEmail(!broadCastEmail)}
                width={800}
                isvisible={broadCastEmail}
            >
                <CreateBroadcastEmail
                    offer_id={state?.offer_id}
                    visible={broadCastEmail}
                    noOfAssociates={data?.findSingleOffer.offer_associates.length}
                    noOfReinsurers={data?.findSingleOffer.offer_participant.length}
                    toggle={() => setbroadCastEmail(!broadCastEmail)}
                />
            </Drawer>

            <Drawer
                width={600}
                isvisible={showDrawerForClosingOffer}
                toggle={() => setShowDrawerForClosingOffer(!showDrawerForClosingOffer)}
            >
                <CloseOffer
                    offer_id={state?.offer_id}
                    offer_commission={data?.findSingleOffer?.commission}
                    toggle={() =>
                        setShowDrawerForClosingOffer(!showDrawerForClosingOffer)
                    }
                    reinsurers={data?.findSingleOffer.offer_participant}
                    policy_number={data?.findSingleOffer.offer_detail.policy_number}
                    offer_status={data?.findSingleOffer.offer_status}
                />
            </Drawer>

        </>
    )
}

export default OfferDescriptionAndOptions
