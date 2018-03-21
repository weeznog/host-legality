import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import yup from 'yup';
import styled from 'styled-components';

import * as actions from '../actions';
import { Input, Button, rem } from '../components/common';

class AuthForm extends Component {
  render() {
    const {
      handleSubmit,
      errors,
      btnText,
      oAuthType,
      invalid,
      pristine,
      submitting
    } = this.props;

    return (
      <LoginWrap>
        <Button
          style={styles.btnStyle}
          link
          href={`/auth/google?oAuthType=${oAuthType}`}
          color="black"
          backgroundcolor="white"
          id="google-oauth"
        >
          Google
        </Button>
        <Form onSubmit={handleSubmit}>
          <Field
            component={Input}
            label="Email address"
            type="email"
            name="email"
            placeholder="enter your email address"
          />
          <Field
            component={Input}
            label="Password"
            type="password"
            name="password"
            placeholder="enter your password"
          />
          <Button
            style={styles.btnStyle}
            type="submit"
            name="action"
            disabled={invalid || submitting || pristine}
          >
            {btnText}
          </Button>

          {errors.localLogin && (
            <ErrorsText className="red-text center-align auth-error">
              {errors.localLogin}
            </ErrorsText>
          )}
        </Form>
      </LoginWrap>
    );
  }
}

const Form = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ErrorsText = styled.p`
  margin-top: 20px !important;
  font-size: 20px;
`;

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${rem(500)};
  margin: 0 auto;
  margin-top: ${rem(55)};
`;

const styles = {
  btnStyle: {
    marginTop: rem(15),
    width: rem(200)
  }
};

function mapStateToProps({ errors }) {
  return { errors };
}

async function asyncValidate({ password, email }) {
  const errors = {};
  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required()
  });

  const _email = await schema.isValid(email);
  const _password = await schema.isValid(password);

  if (!_password) {
    errors.password = 'Password is required';
  }
  if (!_email) {
    errors.email = 'Email is required';
  }
  return errors;
}

// form name passed in props
AuthForm = reduxForm({ asyncValidate })(AuthForm);

export default connect(mapStateToProps, actions)(withRouter(AuthForm));
