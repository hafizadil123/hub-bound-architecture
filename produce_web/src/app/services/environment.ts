const ENVIRONMENT_TYPES = {
  dev: "dev",
  prod: "prod",
};
const ENVOIRMENT_URL = {
  dev: "http://localhost:9000",
  prod: "https://api.hubbound.com", //"http://3.141.222.59:9000"
};
const selectedEnv = ENVIRONMENT_TYPES.prod;

export const BASE_URL = ENVOIRMENT_URL[selectedEnv];
