import { GraphQLError } from "graphql";

export const handleError = (message, code = "BAD_USER_INPUT") => {
  throw new GraphQLError(message, {
    extensions: {
      code,
      http: { status: 400 },
    },
  });
};
