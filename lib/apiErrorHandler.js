export function apiErrorHandler(error) {
  !(error instanceof Array) && console.log(error);
  const [status, message] =
    error instanceof Array ? error : [500, "Internal server error"];
  return Response.json({ message }, { status });
}
