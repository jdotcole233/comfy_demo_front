import React from "react";
import { Fragment } from "react";
import {
  CurrencyValues,
  Selector,
  Datatable,
  Loader,
  InsurerOption,
  ReinsurerOption,
} from "../../components";

const ReportForm = () => {
  const tablesRef = useRef(null);
  const { register, setValue, handleSubmit, errors } = useForm();
  const [insurersData, setInsurersData] = useState([]);
  const [reinsurersData, setReinsurersData] = useState([]);
  const [classOfBusinessData, setClassOfBusinessData] = useState([]);
  const [classOfBusiness, setClassOfBusiness] = useState("");
  const [clientType, setClientType] = useState("");
  const [filters, setFilters] = useState([]);
  const [selectedPeriods, setSelectedPeriods] = useState([]);
  const [containsClosed, setContainsClosed] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [totalFacPremium, setTotalFacPremium] = useState({});
  const [totalFacSumInsured, setTotalFacSumInsured] = useState({});
  const [totalCommission, setTotalCommission] = useState({});
  const [totalNic, setTotalNic] = useState({});
  const [toalBrokerage, setToalBrokerage] = useState({});
  const [totalWithholdingTax, setTotalWithholdingTax] = useState({});
  const [queryData, setQueryData] = useState([]);
  const [printData, setPrintData] = useState([]);
  const [pieChartLabels, setLabels] = useState([]);
  const [pieChartSeries, setSeries] = useState([]);
  const { data: insurers, loading: insurersLoading } = useQuery(INSURERS);
  const { data: reinsurers, loading: reinsurersLoading } = useQuery(REINSURERS);
  const [returnedCurrencies, setReturnedCurrencies] = useState([]);
  const [totalCurrencies, setTotalCurrencies] = useState([]);
  const [formData, setFormData] = useState(null);
  return (
    <Fragment>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="classOfBusiness">Class of business</label>
          <Selector
            isMulti
            value={classOfBusiness}
            onChange={handleChooseBusiness}
            placeholder="Select class of business"
            options={classOfBusinessData}
          />
          <input
            type="hidden"
            name="business_id"
            ref={register({ required: "Required" })}
          />
          {errors.business_id && (
            <p className="text-danger">{errors.business_id.message}</p>
          )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="classOfBusiness">Client type</label>
          <Selector
            onChange={handleChooseClientType}
            placeholder="Select client type"
            options={[
              { label: "All", value: "All" },
              { label: "Reinsurer", value: "Reinsurer" },
              { label: "Insurer", value: "Insurer" },
            ]}
          />
          <input
            type="hidden"
            name="client_type"
            ref={register({ required: "Required" })}
          />
          {errors.client_type && (
            <p className="text-danger">{errors.client_type.message}</p>
          )}
        </div>
      </div>
      {clientType && clientType === "Insurer" ? (
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="classOfBusiness">{clientType}</label>
            {clientType === "Insurer" ? (
                <Selector
                  onChange={handleChooseClient}
                  components={{ Option: InsurerOption }}
                  placeholder="Select insurer"
                  options={insurersData}
                />
            ) : null}
            <input
              type="hidden"
              name="client_id"
              ref={register({
                required: clientType === "Insurer" ? "Required" : false,
              })}
            />
            {errors.client_id && (
              <p className="text-danger">{errors.client_id.message}</p>
            )}
          </div>
        </div>
      ) : clientType === "Reinsurer" ? (
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="classOfBusiness">{clientType}</label>

            {clientType === "Reinsurer" ? (
              <Selector
                onChange={handleChooseClient}
                components={{ Option: ReinsurerOption }}
                placeholder="Select reinsurer"
                options={reinsurersData}
              />
            ) : null}
            <input
              type="hidden"
              name="client_id"
              ref={register({
                required: clientType === "Reinsurer" ? "Required" : false,
              })}
            />
            {errors.client_id && (
              <p className="text-danger">{errors.client_id.message}</p>
            )}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default ReportForm;
