import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useUnblockUser() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReload, setIsReload] = React.useState(0);
  const unblockUser = async (id) => {
    const url = `api/user/${id}/unblock`;
    try {
      setIsLoading(true);
      await http.post(url).then((response) => {
        pushToast("success", response.message);
        setIsLoading(false);
        setIsReload(isReload + 1);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [unblockUser, isLoading, isReload];
}
