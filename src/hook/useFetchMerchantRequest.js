import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { useState } from "react";

export default function useFetchMerchantRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getMerchantRequest = async () => {
    try {
      setIsLoading(true);

      await http.get("/api/merchant/requests").then((response) => {
        console.log("1i3o==========: " + response.data);

        setData(response.data);

        setIsLoading(false);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, getMerchantRequest, isLoading];
}
