import DATA_API from "./DATA_API";

export function getList(params?: any) {
  return DATA_API.get<any>("", { params });
}
