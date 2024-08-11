export const ensureError = (value: unknown) => {
  if (value instanceof Error) {
    return value.message;
  }

  const error = new Error("An error occurred");
  return error;
};
