import gql from "graphql-tag";

export const GENERATE_REPORT = gql`
  mutation reportsQuery($data: Query_data) {
    reportOnQuery(query_data: $data)
  }
`;

export const REPORT_PIECHART = gql`
  {
    reportPieChartData
  }
`;
