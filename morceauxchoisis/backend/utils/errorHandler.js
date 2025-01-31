import { GraphQLError } from "graphql";


export const handleError = (message, code = "BAD_USER_INPUT") => {
  const errorCodes = {
    BAD_USER_INPUT: 400,
    UNAUTHENTICATED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  };

  throw new GraphQLError(message, {
    extensions: {
      code,
      http: { status: errorCodes[code] || 400 },
    },
  });
};

export const handleDatabaseError = (error) => {
  if (error.code === 11000) {
    return handleError("Duplicate field value entered", "BAD_USER_INPUT");
  }
  return handleError("Database error occurred", "INTERNAL_SERVER_ERROR");
};
