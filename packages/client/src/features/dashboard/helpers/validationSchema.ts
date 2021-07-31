import * as yup from 'yup';

import { REQUIRED_FIELD } from '../constants';

const validationSchema = yup.object({
  name: yup.string().required(REQUIRED_FIELD),
  columns: yup
    .array()
    .of(yup.object({ name: yup.string().required(REQUIRED_FIELD) }))
});

export default validationSchema;
