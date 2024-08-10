import initApi from "./initApi";

const rootApi = initApi(import.meta.env.VITE_LINK_API);

export default rootApi;
