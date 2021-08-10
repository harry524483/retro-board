import { useEffect, useState, ChangeEvent } from 'react';

const useForm = <T, R>(initialValues: T, validator: Function) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState({} as R);

  useEffect(() => {
    setErrors(validator(values));
  }, [values, validator]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return { values, errors, handleChange };
};

export default useForm;
