import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useSummaryCase() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const summaryCase = async () => {
    try {
      setIsLoading(true);
      await http.get(`/api/case/summary`).then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, summaryCase, isLoading];
}
