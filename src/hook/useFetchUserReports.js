import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useFetchUserReports() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getUserReports = async (userId) => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const endpoint = userId ? `/api/reports/${userId}` : `/api/reports/`;
      await http.get(endpoint).then((response) => {
        setData(
          response.data.map((data) => ({
            ...data
          }))
        );
        setIsLoading(false);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, getUserReports, isLoading];
}
