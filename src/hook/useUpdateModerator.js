import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useUpdateModerator() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReload, setIsReload] = React.useState(0);
  const updateModerator = async (payload, id) => {
    const url = `api/moderators/${id}`;
    try {
      setIsLoading(true);
      await http.patch(url, payload).then((response) => {
        pushToast("success", response.message);
        setIsLoading(false);
        setIsReload(isReload + 1);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [updateModerator, isLoading, isReload];
}
