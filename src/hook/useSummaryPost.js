import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useSummaryPost() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const summaryPost = async () => {
    try {
      setIsLoading(true);
      await http.get(`/api/post/summary`).then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, summaryPost, isLoading];
}
