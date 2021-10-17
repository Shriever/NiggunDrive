import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AwsUrl = {
  __typename?: 'AwsUrl';
  uploadUrl: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  like: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  uploadNiggun: NiggunResponse;
};


export type MutationLikeArgs = {
  niggunId: Scalars['Int'];
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUploadNiggunArgs = {
  input: NiggunInput;
};

export type Niggun = {
  __typename?: 'Niggun';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isLiked: Scalars['Boolean'];
  length: Scalars['Float'];
  link: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type NiggunInput = {
  length: Scalars['Float'];
  link: Scalars['String'];
  title: Scalars['String'];
};

export type NiggunResponse = {
  __typename?: 'NiggunResponse';
  errors?: Maybe<Array<FieldError>>;
  niggun?: Maybe<Niggun>;
};

export type Query = {
  __typename?: 'Query';
  getAWSUploadUrl: AwsUrl;
  hello: Scalars['String'];
  me?: Maybe<User>;
  niggunim: Array<Niggun>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LikeMutationVariables = Exact<{
  niggunId: Scalars['Int'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like: boolean };

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, id: number } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, id: number } | null | undefined } };

export type UploadNiggunMutationVariables = Exact<{
  input: NiggunInput;
}>;


export type UploadNiggunMutation = { __typename?: 'Mutation', uploadNiggun: { __typename?: 'NiggunResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, niggun?: { __typename?: 'Niggun', id: number, title: string, link: string, length: number } | null | undefined } };

export type GetAwsUploadUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAwsUploadUrlQuery = { __typename?: 'Query', getAWSUploadUrl: { __typename?: 'AwsUrl', uploadUrl: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, id: number } | null | undefined };

export type NiggunimQueryVariables = Exact<{ [key: string]: never; }>;


export type NiggunimQuery = { __typename?: 'Query', niggunim: Array<{ __typename?: 'Niggun', id: number, title: string, link: string, length: number }> };


export const LikeDocument = gql`
    mutation Like($niggunId: Int!) {
  like(niggunId: $niggunId)
}
    `;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      niggunId: // value for 'niggunId'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const LoginDocument = gql`
    mutation Login($options: UsernamePasswordInput!) {
  login(options: $options) {
    errors {
      field
      message
    }
    user {
      email
      id
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(options: {email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      email
      id
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UploadNiggunDocument = gql`
    mutation UploadNiggun($input: NiggunInput!) {
  uploadNiggun(input: $input) {
    errors {
      field
      message
    }
    niggun {
      id
      title
      link
      length
    }
  }
}
    `;
export type UploadNiggunMutationFn = Apollo.MutationFunction<UploadNiggunMutation, UploadNiggunMutationVariables>;

/**
 * __useUploadNiggunMutation__
 *
 * To run a mutation, you first call `useUploadNiggunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadNiggunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadNiggunMutation, { data, loading, error }] = useUploadNiggunMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadNiggunMutation(baseOptions?: Apollo.MutationHookOptions<UploadNiggunMutation, UploadNiggunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadNiggunMutation, UploadNiggunMutationVariables>(UploadNiggunDocument, options);
      }
export type UploadNiggunMutationHookResult = ReturnType<typeof useUploadNiggunMutation>;
export type UploadNiggunMutationResult = Apollo.MutationResult<UploadNiggunMutation>;
export type UploadNiggunMutationOptions = Apollo.BaseMutationOptions<UploadNiggunMutation, UploadNiggunMutationVariables>;
export const GetAwsUploadUrlDocument = gql`
    query GetAWSUploadUrl {
  getAWSUploadUrl {
    uploadUrl
  }
}
    `;

/**
 * __useGetAwsUploadUrlQuery__
 *
 * To run a query within a React component, call `useGetAwsUploadUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAwsUploadUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAwsUploadUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAwsUploadUrlQuery(baseOptions?: Apollo.QueryHookOptions<GetAwsUploadUrlQuery, GetAwsUploadUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAwsUploadUrlQuery, GetAwsUploadUrlQueryVariables>(GetAwsUploadUrlDocument, options);
      }
export function useGetAwsUploadUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAwsUploadUrlQuery, GetAwsUploadUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAwsUploadUrlQuery, GetAwsUploadUrlQueryVariables>(GetAwsUploadUrlDocument, options);
        }
export type GetAwsUploadUrlQueryHookResult = ReturnType<typeof useGetAwsUploadUrlQuery>;
export type GetAwsUploadUrlLazyQueryHookResult = ReturnType<typeof useGetAwsUploadUrlLazyQuery>;
export type GetAwsUploadUrlQueryResult = Apollo.QueryResult<GetAwsUploadUrlQuery, GetAwsUploadUrlQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    email
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NiggunimDocument = gql`
    query Niggunim {
  niggunim {
    id
    title
    link
    length
  }
}
    `;

/**
 * __useNiggunimQuery__
 *
 * To run a query within a React component, call `useNiggunimQuery` and pass it any options that fit your needs.
 * When your component renders, `useNiggunimQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNiggunimQuery({
 *   variables: {
 *   },
 * });
 */
export function useNiggunimQuery(baseOptions?: Apollo.QueryHookOptions<NiggunimQuery, NiggunimQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NiggunimQuery, NiggunimQueryVariables>(NiggunimDocument, options);
      }
export function useNiggunimLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NiggunimQuery, NiggunimQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NiggunimQuery, NiggunimQueryVariables>(NiggunimDocument, options);
        }
export type NiggunimQueryHookResult = ReturnType<typeof useNiggunimQuery>;
export type NiggunimLazyQueryHookResult = ReturnType<typeof useNiggunimLazyQuery>;
export type NiggunimQueryResult = Apollo.QueryResult<NiggunimQuery, NiggunimQueryVariables>;