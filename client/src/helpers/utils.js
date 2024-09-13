export const formatFieldError = (error, keyParam) => {
  if (error?.response?.data?.errors) {
    return error?.response?.data?.errors.find((key) => key.param === keyParam);
  } else {
    return null;
  }
};

export const isErrorForKey = (error, keyParam) => {
  return (
    error?.response?.data?.errors.find((key) => key.param === keyParam) ?? null
  );
};

export const isErrorField = (error) => {
  return error?.response?.data?.errors ? true : false;
};

export const formatError = (error) => {
  if (error?.response?.data) {
    return error.response.data;
  } else {
    return error;
  }
};
