import gql from 'graphql-tag';
// import { CURRENT_USER } from '../fragments';

export const FETCH_USER_QUERY = gql`
  {
    user {
      _id
      _oAuthId
      email
      admin
      properties {
        _id
        address
        status
        compliance
      }
    }
  }
`;

export const FETCH_PROPERTIES = gql`
  {
    properties {
      _id
      address
      compliance
      status
    }
  }
`;
