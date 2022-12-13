import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useFetchModerators() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getModerators = async () => {
    try {
      setIsLoading(true);
      await http.get(`/api/moderators/`).then((response) => {
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

  return [data, getModerators, isLoading];
}
