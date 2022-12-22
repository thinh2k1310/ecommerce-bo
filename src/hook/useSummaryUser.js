import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useSummaryUser() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const summaryUsers = async () => {
    try {
      setIsLoading(true);
      await http.get(`/api/user/summary`).then((response) => {
        setData(response.data);
        setIsLoading(false);
        console.log(data);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, summaryUsers, isLoading];
}
