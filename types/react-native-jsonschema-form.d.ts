declare module 'react-native-jsonschema-form' {
  import React from 'react';

  interface FormProps {
    schema: any;
    uiSchema?: any;
    formData?: any;
    onChange?: (event: any) => void;
    onSubmit?: (event: any) => void;
    onError?: (errors: any) => void;
  }

  const Form: React.FC<FormProps>;

  export default Form;
}
