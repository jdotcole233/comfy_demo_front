import React from "react";
import { Datatable, Loader } from "../../components";
import ErrorPage from "../../components/ErrorPage";
import { ReinstatmentOffers_reinstate_offers_offers } from "../../graphql/queries/__generated__/ReinstatmentOffers";
import { columns } from "./columns";
import StatsSection from "./components/StatsSection";
import { useReinstatementOffers } from "./hooks/useReinstatementOffers";
import { useMemo } from "react";
import { generateOffers } from "./actions";

interface Props {}

const DeletedOffers = (props: Props) => {
  const { loading, offers, error } = useReinstatementOffers();

  if (loading) return <Loader />;

  if (error) return <ErrorPage refetch={null} loading={loading} />;

  return (
    <div className="page-content">
      <StatsSection total={offers?.total ?? 0} />
      <div className="container-fluid">
        <div className="col-xl-12">
          <h3>Cancelled Offers</h3>
        </div>
        <div className="col-xl-12 card">
          <div className="card-body">
            <Datatable
              data={generateOffers(offers?.offers)}
              entries={10}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletedOffers;
