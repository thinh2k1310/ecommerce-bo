import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useSetStateMerchantRequests() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReload, setIsReload] = React.useState(0);

  const setStatusMerchantsRequests = async (status, id) => {
    const url = status
      ? `/api/merchant/approve/${id}`
      : `/api/merchant/reject/${id}`;
    try {
      setIsLoading(true);
      await http.put(url).then((response) => {
        pushToast("success", response.message);
        setIsLoading(false);
        setIsReload(isReload + 1);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [setStatusMerchantsRequests, isLoading, isReload];
}
