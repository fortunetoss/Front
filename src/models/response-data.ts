interface ResponseData {
  status: string;
  message: string;
  data: Record<string, any> | null;
  errorDetails: null | {
    message: string;
    details: string;
  };
  code: number;
}

export default ResponseData;
