import axios from "axios";

import { HTTPMethod } from "../types/api";

/**
 * Make an HTTP request to API
 * @param path
 * @param token
 * @param method
 * @param data
 */
export async function apiFetch(
  path: string,
  token: string | null,
  method: HTTPMethod = "GET",
  data?: any,
) {
  return axios({
    method,
    url: `${process.env.REACT_APP_API_URL}/${path}`,
    data,
    headers: {
      Authorization: token && `Bearer ${token}`,
    },
  }).catch(e => ({ data: { error: e.response.data }}));  
}
