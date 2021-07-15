import { useEffect, useState } from 'react';

const useForm = (initialValues = {}, validator) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validator(values));
  }, [values, validator]);

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return { values, errors, handleChange };
};

export default useForm;
