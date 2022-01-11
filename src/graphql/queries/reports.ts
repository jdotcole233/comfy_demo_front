import gql from "graphql-tag";

export const GENERATE_REPORT = gql`
  mutation GenerateReport($data: Query_data) {
    reportOnQuery(query_data: $data)
  }
`;

export const REPORT_PIECHART = gql`
  query ReportPie {
    reportPieChartData
  }
`;
