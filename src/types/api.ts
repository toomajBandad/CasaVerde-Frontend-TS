// ---------------------------------------------
// JSON Types
// ---------------------------------------------
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONValue[];

export interface JSONObject {
  [key: string]: JSONValue;
}

// ---------------------------------------------
// API Response Types
// ---------------------------------------------
export type ApiSuccess<T> = {
  ok: true;
  data: T;
  message?: string;
};

export type ApiError = {
  ok: false;
  error: string;
  message?: string;
  status?: number;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ---------------------------------------------
// Fetcher Type
// ---------------------------------------------
export type Fetcher = <T>(input: RequestInfo, init?: RequestInit) => Promise<T>;

// ---------------------------------------------
// Typed Response for API Routes (Optional)
// Useful for Next.js Route Handlers
// ---------------------------------------------
export type TypedResponse<T> = Response & {
  json: () => Promise<T>;
};
