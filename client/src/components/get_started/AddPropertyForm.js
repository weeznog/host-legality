import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import PlacesAutocomplete from '../../utils/GoogleAutocomplete';
import { Button, Input, rem } from '../common';

const AddPropertyForm = props => {
  const { handleSubmit, nextBtnText } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        className="form-input"
        name="property"
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
        <Button className="addPropertyBtn" type="submit">
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

export default AddPropertyForm;