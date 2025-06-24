// cypress/support/utils/graphqlUtils.ts

/**
 * Utility functions for GraphQL API interactions.
 */
export const graphqlUtils = {
  /**
   * Performs a GraphQL query or mutation.
   * @param url - The GraphQL endpoint URL.
   * @param query - The GraphQL query string or query object.
   * @param variables - Optional variables for the query.
   * @param headers - Optional headers (e.g., for authorization).
   * @returns Cypress.Chainable<Cypress.Response<any>>
   * @example
   *  graphqlUtils.query('https://api.spacex.land/graphql/', '{ company { name ceo } }')
   *    .then(response => {
   *      expect(response.status).to.eq(200);
   *      expect(response.body.data.company.name).to.eq('SpaceX');
   *    });
   *
   *  graphqlUtils.query(
   *    Cypress.env('GRAPHQL_ENDPOINT'), // Get from environment
   *    `query User($id: ID!) { user(id: $id) { id name email } }`,
   *    { id: '1' },
   *    { 'Authorization': 'Bearer YOUR_TOKEN' }
   *  ).then(response => {
   *      expect(response.body.data.user.name).to.exist;
   *  });
   */
  query: (
    url: string,
    query: string | { query: string; operationName?: string },
    variables?: Record<string, any>,
    headers?: Record<string, string>
  ): Cypress.Chainable<Cypress.Response<any>> => {
    const requestBody: { query: string; variables?: Record<string, any>; operationName?: string } =
      typeof query === 'string' ? { query } : query;

    if (variables) {
      requestBody.variables = variables;
    }

    return cy.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: requestBody,
      failOnStatusCode: false, // Allow handling of non-2xx responses and GraphQL errors in tests
    });
  },

  /**
   * Performs a GraphQL schema introspection query.
   * This is a basic introspection query. More specific queries can be built.
   * @param url - The GraphQL endpoint URL.
   * @param headers - Optional headers.
   * @returns Cypress.Chainable<Cypress.Response<any>>
   * @example
   *  graphqlUtils.introspectSchema('https://api.spacex.land/graphql/')
   *    .then(response => {
   *      expect(response.status).to.eq(200);
   *      expect(response.body.data.__schema.queryType.name).to.eq('Query');
   *    });
   */
  introspectSchema: (
    url: string,
    headers?: Record<string, string>
  ): Cypress.Chainable<Cypress.Response<any>> => {
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          queryType { name }
          mutationType { name }
          subscriptionType { name }
          types {
            ...FullType
          }
          directives {
            name
            description
            locations
            args {
              ...InputValue
            }
          }
        }
      }

      fragment FullType on __Type {
        kind
        name
        description
        fields(includeDeprecated: true) {
          name
          description
          args {
            ...InputValue
          }
          type {
            ...TypeRef
          }
          isDeprecated
          deprecationReason
        }
        inputFields {
          ...InputValue
        }
        interfaces {
          ...TypeRef
        }
        enumValues(includeDeprecated: true) {
          name
          description
          isDeprecated
          deprecationReason
        }
        possibleTypes {
          ...TypeRef
        }
      }

      fragment InputValue on __InputValue {
        name
        description
        type { ...TypeRef }
        defaultValue
      }

      fragment TypeRef on __Type {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    return graphqlUtils.query(url, introspectionQuery, undefined, headers);
  },
};

// Example of adding to Cypress commands if preferred:
// Cypress.Commands.add('graphqlQuery', graphqlUtils.query);
// Cypress.Commands.add('introspectGraphQLSchema', graphqlUtils.introspectSchema);
