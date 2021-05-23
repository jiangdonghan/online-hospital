import { useEffect, useState } from "react";
import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { Prescription } from "../views/video-chat/prescription-fragment";
import { success } from "./utils";

export const usePrescription = (appointmentId: number) => {
  const [interval, setInterval] = useState(20);

  const { run, setData, data, ...result } = useAsync<Prescription>();
  const client = useHttp();
  useEffect(() => {
    run(client(`appointment/${appointmentId}/prescription`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentId, interval]);

  const savePrescription = (params: Prescription) => {
    run(
      client(`appointment/${appointmentId}/prescription`, {
        method: "PUT",
        data: params,
      })
    ).then(() => {
      success("Successfully saved prescription");
    });
  };

  return { data, setInterval, setData, ...result, savePrescription };
};
