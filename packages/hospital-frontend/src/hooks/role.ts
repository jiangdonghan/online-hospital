import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { PatientModel } from "../models";
export const useDoctors = () => {
  const client = useHttp();
  const { run, setData, data, ...result } = useAsync<any>();
  useEffect(() => {
    run(client(`doctors`)).then((data) => {
      const dataArr = Object.keys(data).map((item) => data[item]);
      dataArr.pop();
      setData(dataArr);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, ...result };
};

export const usePatient = (param?: Partial<PatientModel>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<PatientModel>();
  useEffect(() => {
    run(
      client("patient/{param?.id}", {
        data: cleanObject(param || {}),
        method: "put",
      })
    );
  }, [client, param, run]);

  return result;
};
