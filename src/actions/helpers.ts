interface Success<T> {
  data: T;
  error: null;
  ok: true;
}
interface Failure {
  data: null;
  error: { message: string };
  ok: false;
}
export type ActionResponse<T> = Success<T> | Failure;

// Function overloads
export function createActionResponse<T>(data: T): Success<T>;
export function createActionResponse(
  data: null,
  errorMessage?: string
): Failure;

/**
 * Creates an action response object.
 *
 * @param data - The data to include in the response. If `null`, an error message must be provided.
 * @param errorMessage - The error message to include in the response if `data` is `null`. If not provided, defaults to "Unknown error".
 *
 * @returns An object representing the result of the action. If `data` is not `null`, it returns a success response. If `data` is `null`, it returns a failure response.
 *
 * @example
 * // Successful response with data
 * const successResponse = createActionResponse({ id: "1", name: "John Doe" });
 * console.log(successResponse);
 * // Output: { data: { id: "1", name: "John Doe" }, error: null, ok: true }
 *
 * @example
 * // Failure response with an error message
 * const failureResponse = createActionResponse(null, "Something went wrong");
 * console.log(failureResponse);
 * // Output: { data: null, error: { message: "Something went wrong" }, ok: false }
 *
 * @example
 * // Failure response with default error message
 * const failureResponse = createActionResponse(null);
 * console.log(failureResponse);
 * // Output: { data: null, error: { message: "Unknown error" }, ok: false }
 */
export function createActionResponse<T>(
  data: T | null,
  errorMessage?: string
): ActionResponse<T> {
  if (data !== null) {
    return {
      data,
      error: null,
      ok: true,
    };
  } else {
    return {
      data: null,
      error: { message: errorMessage || "Something went wrong." },
      ok: false,
    };
  }
}
