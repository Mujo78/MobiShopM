export const formatFieldError = (error, keyParam) => {
  if (error?.response?.data?.errors) {
    return error?.response?.data?.errors.find((key) => key.param === keyParam);
  } else if (error?.response?.data?.message?.toLowerCase().includes(keyParam)) {
    return error.response.data;
  }
  return null;
};

export const isValidationErrorForKey = (error, keyParam) => {
  return (
    error?.response?.data?.errors.find((key) => key.param === keyParam) ?? null
  );
};

export const isErrorForKey = (error, keyParam) => {
  return error?.response?.data?.message?.toLowerCase().includes(keyParam);
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

export function formatDate(date) {
  const d = new Date(date);
  const formattedDate = `${
    d.getMonth() + 1
  }/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return formattedDate;
}
