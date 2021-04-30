import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { DoctorModel, PatientModel } from "../models";
export const useDoctor = (param?: Partial<DoctorModel>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<DoctorModel>();
  useEffect(() => {
    run(
      client(`doctor${param?.id}`, {
        data: cleanObject(param || {}),
        method: "put",
      })
    );
  }, [client, param, run]);

  return result;
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
