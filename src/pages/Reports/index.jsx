/* eslint-disable no-throw-literal */
import React from 'react'
import { CurrencyValues, Selector, Datatable, Loader, InsurerOption, ReinsurerOption } from '../../components'
import Chart from 'react-apexcharts';
import { INSURERS, REINSURERS, FETCH_CLASS_OF_BUSINESS } from '../../graphql/queries';
import { useEffect, useState, useRef } from 'react';
import { paymentOptions, insurerTable, reinsurerTable, allTable, periodStatus, offerStatusOptions } from './options'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-apollo'
import { GENERATE_REPORT, REPORT_PIECHART } from '../../graphql/queries/reports';
import jsPDF from 'jspdf'
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Anim from 'react-reveal/Zoom'
import _ from 'lodash'
import 'jspdf-autotable'
import swal from 'sweetalert';
import { Animated } from "react-animated-css";
import Converter from './Components/Converter';
import CSVComponent from './Components/CSVComponent';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)



const groupProps = {
    appear: true,
    enter: true,
    exit: true,
}



function Reports() {
    const { data: piechartData, loading: pageLoading } = useQuery(REPORT_PIECHART)
    const tablesRef = useRef(null)
    const { register, setValue, handleSubmit, errors } = useForm()
    const [insurersData, setInsurersData] = useState([])
    const [reinsurersData, setReinsurersData] = useState([])
    const [classOfBusinessData, setClassOfBusinessData] = useState([])
    const [classOfBusiness, setClassOfBusiness] = useState("")
    const [clientType, setClientType] = useState("")
    const [filters, setFilters] = useState([])
    const [selectedPeriods, setSelectedPeriods] = useState([])
    const [containsClosed, setContainsClosed] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState([])
    const [totalFacPremium, setTotalFacPremium] = useState({})
    const [totalFacSumInsured, setTotalFacSumInsured] = useState({})
    const [totalCommission, setTotalCommission] = useState({})
    const [totalNic, setTotalNic] = useState({})
    const [toalBrokerage, setToalBrokerage] = useState({})
    const [totalWithholdingTax, setTotalWithholdingTax] = useState({})
    const [queryData, setQueryData] = useState([])
    const [printData, setPrintData] = useState([])
    const [pieChartLabels, setLabels] = useState([])
    const [pieChartSeries, setSeries] = useState([])
    const { data: insurers, loading: insurersLoading } = useQuery(INSURERS);
    const { data: reinsurers, loading: reinsurersLoading } = useQuery(REINSURERS);
    const { data: classOfbusiness, loading: classOfBusinessLoading } = useQuery(FETCH_CLASS_OF_BUSINESS)
    const [returnedCurrencies, setReturnedCurrencies] = useState([])
    const [totalCurrencies, setTotalCurrencies] = useState([])
    const [formData, setFormData] = useState(null)


    useEffect(() => {
        if (piechartData) {
            const resp = JSON.parse(piechartData.reportPieChartData).splice(0, 5);
            const labels = [...resp.map(val => val.business_name)]
            const series = [...resp.map(val => val.total_businesses)]
            setSeries(series);
            setLabels(labels)
        }
    }, [piechartData])

    const [generate, { loading }] = useMutation(GENERATE_REPORT)

    const printTable = () => {
        const doc = new jsPDF()

        doc.text(`Brokerage Statement as at ${new Date().toLocaleDateString()}`, 5, 10)
        doc.autoTable({
            startY: 20,
            margin: 5,
            styles: { fontSize: 8 },
            showHead: "firstPage",
            rowPageBreak: "avoid",
            head: [clientType === "Reinsurer" ? [...reinsurerTable.map(el => el.label)] : clientType === "All" ? [...allTable.map(el => el.label)] : [...insurerTable.map(el => el.label)]],
            body: [...printData.map(el => Object.values(_.pick(el, clientType === "Reinsurer" ? [...reinsurerTable.map(el => el.field)] : clientType === "All" ? [...allTable.map(el => el.field)] : [...insurerTable.map(el => el.field)])))],
        })
        // doc.text(`Total of brokerages in various currencies`, 5, 10)

        doc.autoTable({
            margin: 5,
            columns: [
                { header: "Currency", dataKey: "currency" },
                { header: "Fac. Sum Insured", dataKey: "fac_sum_insured" },
                { header: "Fac. Premium", dataKey: "fac_premium" },
                { header: "Brokerage", dataKey: "brokerage" },
            ],
            body: totalCurrencies
        })
        swal({
            title: "Save document as",
            content: "input",
            buttons: ["Cancel", { text: "Save", closeModal: true }]
        }).then(input => {
            if (!input) throw {}
            doc.save(`${input}.pdf`)
        }).catch(err => { })
    }


    const options = {
        series: [4, 13, 67, 34, 98],
        labels: ["Coca-cola", "Fanta", "Pepsi", "Miranda", "7Up"]
    }

    useEffect(() => {
        if (classOfbusiness) {
            const _classOfbusiness = classOfbusiness.classOfBusinesses.map(el => ({ label: el.business_name, value: el }))
            setClassOfBusinessData([{ label: "All", value: { class_of_business_id: " " } }, ..._classOfbusiness])
        }
    }, [classOfbusiness])

    useEffect(() => {
        if (reinsurers) {
            const _reinsurers = reinsurers.reinsurers.map(el => ({ label: el.re_company_name, value: el }))
            setReinsurersData([{ label: "All", value: { re_abbrv: "All", reinsurer_id: " " } }, ..._reinsurers])
        }
    }, [reinsurers])

    useEffect(() => {
        if (insurers) {
            const _insurers = insurers.insurers.map(el => ({ label: el.insurer_company_name, value: el }))
            setInsurersData([{ label: "All", value: { insurer_abbrv: "All", insurer_id: " " } }, ..._insurers])
        }
    }, [insurers])

    useEffect(() => {
        if (filters.length) {
            setContainsClosed(filters.some(el => el.label === "CLOSED" || el.label === "ALL"))
        } else {
            setContainsClosed(false)
        }
    }, [filters])

    useEffect(() => {
        if (!containsClosed) {
            setPaymentStatus([])
        }
    }, [containsClosed]);

    const handleChooseClientType = value => {
        setClientType(value ? value.value : "")
        setValue("client_type", value ? value.value : "")
        if (value.value === "All") {
            // alert("All Selected")
        }
    }

    const handleChooseFilter = value => {
        if (value && value.some(el => el.label === "ALL")) {
            setFilters(value.filter(val => val.label === "ALL"))
            setValue("offer_status", value.filter(val => val.label === "ALL"))
            return;
        }
        console.log(value)
        setFilters(value ? value : [])
        setValue("offer_status", value)

    }


    const handleChoosePeriodStatus = value => {
        console.log(value)
        setSelectedPeriods(value ? value : [])
        setValue("period_status", value)
    }

    const handleChoosePaymentStatus = value => {
        setPaymentStatus(value ? value : [])
    }

    const handleChooseBusiness = value => {
        setClassOfBusiness(value ? value : "")
        setValue("business_id", value ? value.value.class_of_business_id : "")
    }

    const handleChooseClient = value => {
        setValue("client_id", value ? value.value[clientType === "Reinsurer" ? "reinsurer_id" : "insurer_id"] : "")
    }

    const handleSuccessFulGeneration = ({ data }) => {
        const incomingReports = JSON.parse(data.reportOnQuery).query_output
        // console.log(incomingReports)
        if (!incomingReports.length) {
            swal({
                closeOnClickOutside: false,
                closeOnEsc: false,
                icon: "warning",
                title: `Whoops!!`,
                text: "Sorry no data found for this query "
            }).then(input => {
                if (!input) throw null;
                setQueryData(prev => [...incomingReports])
                setPrintData([])
                setToalBrokerage({})
                setTotalCommission({})
                setTotalFacPremium({})
                setTotalFacSumInsured({})
                setTotalCommission({})
                setTotalNic({})
                setToalBrokerage({});
                setTotalWithholdingTax({})
                setReturnedCurrencies([])
                setTotalCurrencies([])
            })
        } else {
            const resp = JSON.parse(data.reportOnQuery)
            const printerData = incomingReports.map(report => ({
                ...report,
                business_name: report.business_name.replace("Fleet", ""),
                fac_sum_insured: `${report.currency} ${report.fac_sum_insured}`,
                fac_premium: `${report.currency} ${report.fac_premium}`,
                re_company_name: report.re_company_name || report.insurer_company_name,
                brokerage_amount: `${report.currency} ${report.brokerage_amount}`,
                offer_date: new Date(report.offer_date).toDateString(),
                period: `${report.period_of_insurance_from}- ${report.period_of_insurance_to}`,
            }));
            const reports = incomingReports.map(report => ({
                ...report,
                business_name: report.business_name.replace("Fleet", ""),
                fac_sum_insured: `${report.currency} ${report.fac_sum_insured}`,
                fac_premium: `${report.currency} ${report.fac_premium}`,
                re_company_name: report.re_company_name || report.insurer_company_name,
                brokerage_amount: `${report.currency} ${report.brokerage_amount}`,
                offer_date: new Date(report.offer_date).toDateString(),
                offer_status: (
                    <span style={{ letterSpacing: 3 }} className={`badge badge-${report.offer_status === "OPEN" ? "primary" : report.offer_status === "PENDING" ? "danger" : "success"} font-size-11`}>{report.offer_status}</span>
                ),
                payment_status: (
                    <span style={{ letterSpacing: 5, padding: 3 }} className={`badge badge-${report.payment_status === "PARTPAYMENT" ? "primary" : report.payment_status === "UNPAID" ? "danger" : "success"} font-size-11`}>{report.payment_status}</span>
                )
            }))
            setPrintData(printerData)
            setQueryData(reports)
            setTotalFacPremium(resp.total_fac_premium)
            setTotalFacSumInsured(resp.total_fac_sum_insured)
            setTotalCommission(resp.total_commission)
            setTotalNic(resp.total_nic_levy)
            setToalBrokerage(resp.total_brokerage);
            setTotalWithholdingTax(resp.total_withholding_tax)
            setReturnedCurrencies(resp.currencies)
            setTotalCurrencies(resp.total_currencies)
            executeScroll()
        }

    }

    const generateReport = values => {
        const client_id = values.client_id
        delete values.client_id
        const obj = {
            ...values,
            reinsurer_id: client_id ? client_id : " ",
            insurer_id: client_id ? client_id : " ",
            offer_status: [...filters.map(el => el.label)],
            payment_status: [...paymentStatus.map(el => el.label)],
            period_status: [...selectedPeriods.map(el => el.label)],
            convert_from: [],
            convert_to: ""
        }
        setFormData(obj)
        setQueryData(prev => [])
        const variables = { data: obj }
        generate({ variables }).then(res => handleSuccessFulGeneration(res)).catch(err => { })
    }




    const showData = queryData.length ? true : false



    const executeScroll = () => scrollToRef(tablesRef)


    if (pageLoading || insurersLoading || reinsurersLoading || classOfBusinessLoading) return <Loader />

    return (
        <div className="page-content">
            <TransitionGroup {...groupProps}>
                <div className="card">
                    <div className="card-body">
                        <div className="col-md-12">
                            <div className="row">
                                <h6 className="text-muted font-weight-medium">Top five businesses</h6>
                            </div>
                            <Chart height="250" type="pie" options={!pieChartLabels ? options : { labels: pieChartLabels, pieChartSeries }} series={pieChartLabels ? pieChartSeries : options.series} />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row d-flex justify-content-between px-3">
                            <p className="text-muted font-weight-medium">Brokerage Statement/Reporting </p>
                            <Converter available_cuurencies={returnedCurrencies} formData={formData} onGenerateFinished={handleSuccessFulGeneration} />
                        </div>
                        <form onSubmit={handleSubmit(generateReport)} className="row">

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="classOfBusiness">Class of business</label>
                                    <Selector value={classOfBusiness} onChange={handleChooseBusiness} placeholder="Select class of business" options={classOfBusinessData} />
                                    <input type="hidden" name="business_id" ref={register({ required: "Required" })} />
                                    {errors.business_id && <p className="text-danger">{errors.business_id.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="classOfBusiness">Client type</label>
                                    <Selector onChange={handleChooseClientType} placeholder="Select client type" options={[{ label: "All", value: "All" }, { label: "Reinsurer", value: "Reinsurer" }, { label: "Insurer", value: "Insurer" }]} />
                                    <input type="hidden" name="client_type" ref={register({ required: "Required" })} />
                                    {errors.client_type && <p className="text-danger">{errors.client_type.message}</p>}
                                </div>
                            </div>
                            {clientType && clientType === "Insurer" && <div className="col-md-12">

                                <div className="form-group">
                                    <label htmlFor="classOfBusiness">{clientType}</label>
                                    {clientType === "Insurer" ?
                                        <Animated isVisible={clientType === "Insurer"} animationIn="fadeInUp">
                                            <Selector onChange={handleChooseClient} components={{ Option: InsurerOption }} placeholder="Select insurer" options={insurersData} />
                                        </Animated>
                                        : null}
                                    <input type="hidden" name="client_id" ref={register({ required: clientType === "Insurer" ? "Required" : false })} />
                                    {errors.client_id && <p className="text-danger">{errors.client_id.message}</p>}
                                </div>
                            </div>}
                            {clientType && clientType === "Reinsurer" && <div className="col-md-12">

                                <div className="form-group">
                                    <label htmlFor="classOfBusiness">{clientType}</label>

                                    {clientType === "Reinsurer" ? <Selector onChange={handleChooseClient} components={{ Option: ReinsurerOption }} placeholder="Select reinsurer" options={reinsurersData} /> : null}
                                    <input type="hidden" name="client_id" ref={register({ required: clientType === "Reinsurer" ? "Required" : false })} />
                                    {errors.client_id && <p className="text-danger">{errors.client_id.message}</p>}
                                </div>
                            </div>}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="classOfBusiness">From</label>
                                    <input type="date" ref={register({ required: "Required" })} name="from" id="" className="form-control" />
                                    {errors.from && <p className="text-danger">{errors.from.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="classOfBusiness">To</label>
                                    <input type="date" ref={register({ required: "Required" })} name="to" id="" className="form-control" />
                                    {errors.to && <p className="text-danger">{errors.to.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="filters">Filter by offer period</label>
                                    <Selector value={selectedPeriods} onChange={handleChoosePeriodStatus} isMulti placeholder="Select filter(s)" options={periodStatus} />
                                    <input type="hidden" ref={register({ required: "Required" })} name="period_status" id="" className="form-control" />
                                    {errors.period_status && <p className="text-danger">{errors.period_status.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="filters">Filter by offer status</label>
                                    <Selector value={filters} onChange={handleChooseFilter} isMulti placeholder="Select filter(s)" options={offerStatusOptions} />
                                    <input type="hidden" ref={register({ required: "Required" })} name="offer_status" id="" className="form-control" />
                                    {errors.offer_status && <p className="text-danger">{errors.offer_status.message}</p>}
                                </div>
                            </div>
                            {containsClosed &&
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="filters">Filter by payment Status</label>
                                        <Selector value={paymentStatus} onChange={handleChoosePaymentStatus} isMulti placeholder="Select filter(s)" options={paymentOptions} />
                                        <input type="hidden" ref={register({ required: containsClosed ? "Required" : false })} name="payment_status" value={paymentStatus} id="" className="form-control" />
                                        {errors.payment_status && <p className="text-danger">{errors.payment_status.message}</p>}
                                    </div>
                                </div>
                            }
                            <div className="form-group col-md-12">
                                {!loading ?
                                    <button type="submit" className="btn btn-block btn-sm btn-primary waves-effect waves-light">Generate report</button> :
                                    <button disabled={true} className="btn btn-primary btn-sm btn-block waves-effect waves-light">
                                        <i class="bx bx-hourglass bx-spin mr-2"></i>
                                        Generating query...
                            </button>}
                            </div>
                        </form>
                    </div>
                </div>
                {showData ? <div className="row">
                    <div className="col-md-4">
                        <Anim collapse bottom>
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">Total Brokerage </p>
                                            <CurrencyValues data={toalBrokerage} />
                                        </div>

                                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                            <span className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bx-money font-size-24"></i>
                                            </span>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </Anim>
                    </div>
                    <div className="col-md-4">
                        <Anim collapse bottom>
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">Total Fac. Premium</p>
                                            <CurrencyValues data={totalFacPremium} />
                                        </div>

                                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                            <span className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bx-money font-size-24"></i>
                                            </span>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </Anim>
                    </div>
                    <div className="col-md-4">
                        <Anim collapse bottom>
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">Total Fac. Sum Insured </p>
                                            <CurrencyValues data={totalFacSumInsured} />
                                        </div>

                                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                            <span className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bx-money font-size-24"></i>
                                            </span>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </Anim>
                    </div>
                    <div className="col-md-4">
                        <Anim collapse bottom>
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">Total Withholding Tax </p>
                                            <CurrencyValues data={totalWithholdingTax} />
                                        </div>

                                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                            <span className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bx-money font-size-24"></i>
                                            </span>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </Anim>
                    </div>
                    <div className="col-md-4">
                        <Anim collapse bottom>
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">Total NIC Levy </p>
                                            <CurrencyValues data={totalNic} />
                                        </div>

                                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                            <span className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bx-money font-size-24"></i>
                                            </span>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </Anim>
                    </div>
                    <div className="col-md-4">
                        <Anim collapse bottom>
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">Comission Paid </p>
                                            <CurrencyValues data={totalCommission} />
                                        </div>

                                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                            <span className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bx-money font-size-24"></i>
                                            </span>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </Anim>
                    </div>
                </div> : null}
                {showData ? <div className="card" ref={tablesRef}>

                    <div className="card-body">
                        <p className="text-muted font-weight-medium">Report</p>
                        <div className="row d-flex justify-content-end align-items-center mr-2">
                            <button className="btn btn-sm w-md btn-primary mr-1" onClick={printTable}>
                                <i className="bx bx-save mr-1"></i>
                            save as pdf
                        </button>
                            <CSVComponent
                                totals={totalCurrencies}
                                type={clientType}
                                reports={printData} />

                        </div>
                        <Datatable entries={5} columns={clientType === "Reinsurer" ? reinsurerTable : clientType === "All" ? allTable : insurerTable} data={queryData} />
                    </div>
                </div> : null}


            </TransitionGroup>
        </div >
    )
}

export default Reports
