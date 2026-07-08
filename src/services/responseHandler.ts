export function validateResponse(
  response: any
) {
  if (!response.success) {
    throw new Error(
      response.message ?? "Request failed."
    );
  }

  return response;
}