import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useAcceptReport() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReload, setIsReload] = React.useState(0);
  const acceptReport = async (id) => {
    const url = `api/reports/${id}/accept`;
    try {
      setIsLoading(true);
      await http.delete(url).then((response) => {
        pushToast("success", response.message);
        setIsLoading(false);
        setIsReload(isReload + 1);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [acceptReport, isLoading, isReload];
}
