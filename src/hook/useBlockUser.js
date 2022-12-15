import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useBlockUser() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReload, setIsReload] = React.useState(0);
  const blockUser = async (id) => {
    const url = `api/user/${id}/block`;
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

  return [blockUser, isLoading, isReload];
}
