const BASE_URL: string =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL || "https://www.vaktbua.no";

export default BASE_URL;
