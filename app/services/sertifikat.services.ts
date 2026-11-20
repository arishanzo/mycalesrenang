import { API_BASE_URL, fetchAPI, getAuthHeaders } from "../libs/api";
import type { SertifikatData, SertifikatInput } from "../types/types";

 const authHeaders = await getAuthHeaders();

type SertifikatApiData = Omit<SertifikatData, "id" | "tgl_sertifikat"> & {
  id_sertifikat: string | number;
  tgl_sertifikat: Date | string;
};

export type CreateSertifikatResponse = {
  success: boolean;
  message: string;
};

const normalizeSertifikat = (sertifikat: SertifikatApiData): SertifikatData => {
  const id = sertifikat.id_sertifikat;
  if (id === undefined || String(id).trim() === '') {
    throw new Error('Data sertifikat tidak memiliki id_sertifikat.');
  }

  return {
    ...sertifikat,
    id: String(id),
    tgl_sertifikat: sertifikat.tgl_sertifikat instanceof Date
      ? sertifikat.tgl_sertifikat
      : new Date(sertifikat.tgl_sertifikat),
  };
};

export const getAll = async (): Promise<SertifikatData[]> => {
  const data = await fetchAPI<SertifikatApiData[]>("/sertifikat/");
  return data.map(normalizeSertifikat);
};

export const getById = async (id: string): Promise<SertifikatData> => {
  const data = await fetchAPI<SertifikatApiData>(
    `/sertifikat/${encodeURIComponent(id)}`,
  );
  return normalizeSertifikat(data);

};

export const getSertifikatFileUrl = (
  fileName: string,
  type: 'certificate' | 'monthly-report' = 'certificate',
): string => {
  const route = type === 'certificate' ? 'filesertifikat' : 'filelaporanbulanan';
  return `${API_BASE_URL}/sertifikat/${route}/${encodeURIComponent(fileName)}`;
};


export const createSertifikat = async (
  data: SertifikatInput | FormData
): Promise<CreateSertifikatResponse> => {
  const isFormData = data instanceof FormData;

  return await fetchAPI<CreateSertifikatResponse>("/sertifikat/create", {
    method: "POST",
    headers: isFormData
      ? authHeaders
      : { ...authHeaders, "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data),
  });
};


export const deleteSertifikat = async (id: string): Promise<void> => {
  return await fetchAPI<void>(`/sertifikat/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      ...authHeaders,
    },
  });
};
