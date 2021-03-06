const getBaseFrontUrl = () => {
  const reactAppEnv = process.env.REACT_APP_ENV;
  if (reactAppEnv === "dev") {
    return process.env.REACT_APP_DEV_FRONTEND;
  } else {
    return process.env.REACT_APP_PROD_FRONTEND;
  }
};

const getBaseUrl = () => {
  const reactAppEnv = process.env.NODE_ENV;
  if (reactAppEnv === "dev") {
    return process.env.REACT_APP_DEV_SERVER;
  } else {
    return window.location.origin;
  }
};

export { getBaseFrontUrl, getBaseUrl };
