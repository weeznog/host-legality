import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import PlacesAutocomplete from '../../utils/GoogleAutocomplete';
import { Button, Input, rem } from '../../components/common';

const AddressForm = props => {
  const { handleSubmit, nextBtnText, pristine, invalid, submitting } = props;
  return (
    <Form onSubmit={handleSubmit} id="addProperty">
      <Field
        className="form-input"
        name="googleData"
        component={PlacesAutocomplete}
        placeholder="enter property address"
      />

      <Field
        className="form-input"
        name="unitNumber"
        label="Unit number"
        component={Input}
        placeholder="enter unit number"
      />

      <div className="center-xs">
        <Button
          className="addPropertyBtn"
          type="submit"
          disable={pristine || invalid || submitting}
        >
          {nextBtnText}
        </Button>
      </div>
    </Form>
  );
};

const Form = styled.form`
  margin-top: ${rem(20)};

  &.form-input {
    margin-top: ${rem(20)};
  }

  &.addPropertyBtn {
    margin-top: ${rem(20)};
  }
`;

function validate(values) {
  const errors = {};
  if (!values.googleData) {
    errors.googleData = 'valid address is required';
  }
  return errors;
}

export default reduxForm({
  validate,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(AddressForm);
