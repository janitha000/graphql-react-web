const { GraphQLScalarType } = require("graphql");

const dateScaler = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scaler type',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        return new Date(value)
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    }
})