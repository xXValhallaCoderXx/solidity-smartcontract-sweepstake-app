import { Text, TextInput, Button, Spinner } from "grommet";
import { useState } from "react";
import styled from "styled-components";

const EnterSneakySweepForm = ({ onSubmit, loading, error, clearError }) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    error && clearError && clearError();
    setValue(event.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    onSubmit && onSubmit(value);
  };
  return (
    <Form onSubmit={handleOnSubmit}>
      <FormField>
        <Text>Enter amount to enter Sneaky Sweep!</Text>
      </FormField>
      <FormField>
        <TextInput
          value={value}
          onChange={onChange}
          placeholder="Enter amount..."
        />
      </FormField>
      <FormField>
        {loading ? (
          <Spinner />
        ) : (
          <Button primary label="Enter Sneaky Sweep!" type="submit" />
        )}
      </FormField>
      {error && (
        <ErrorText color="red" size="small">
          {error}
        </ErrorText>
      )}
      <Text size="xsmall">Note: Transaction may take up to 30 seconds</Text>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormField = styled.div`
  padding: 10px;
`;

const ErrorText = styled(Text)`
  margin-bottom: 10px;
`;

export default EnterSneakySweepForm;
