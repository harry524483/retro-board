/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';

import { nanoid } from '@reduxjs/toolkit';

import validationSchema from '../helpers/validationSchema';
import { MAX_VOTES } from '../constants';
import { useDispatch } from 'react-redux';
import { colors } from '../../../common/constants';
import { createBoard } from '../../../common/actions';

const { Field, Input, Checkbox, Button } = Form;

const BoardForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      maxVotes: MAX_VOTES,
      hideCards: { label: 'Hide cards initially', checked: false },
      disableVoting: { label: 'Disable voting initially', checked: false },
      hideCount: { label: 'Hide vote count', checked: false },
      columns: [
        { id: nanoid(), name: '', color: colors[0], cards: [] },
        { id: nanoid(), name: '', color: colors[1], cards: [] },
        { id: nanoid(), name: '', color: colors[2], cards: [] }
      ]
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(createBoard(values));
    }
  });

  const handleAddClick = () => {
    const columns = [...formik.values.columns];
    columns.push({
      id: nanoid(),
      name: '',
      color: colors[columns.length],
      cards: []
    });

    formik.setValues({ ...formik.values, columns });
  };

  const handleRemoveClick = (index) => {
    const columns = [...formik.values.columns];
    columns.splice(index, 1);

    formik.setValues({ ...formik.values, columns });
  };

  const renderedColumns = formik.values.columns.map(({ name }, index) => {
    const columnErrors = formik.errors.columns && formik.errors.columns[index];
    const columnTouched =
      formik.touched.columns && formik.touched.columns[index];

    return (
      <Input
        style={{ width: '100%' }}
        placeholder="Enter column name"
        key={index}
        value={name}
        name={`columns.${index}.name`}
        onChange={formik.handleChange}
        icon={
          index !== 0 && (
            <Button
              basic
              type="button"
              icon="cancel"
              onClick={() => handleRemoveClick(index)}
            />
          )
        }
        error={
          columnTouched && columnErrors && formik.errors.columns[index].name
        }
      />
    );
  });

  const renderedOptions = () => {
    const { hideCards, disableVoting, hideCount } = formik.values;

    const options = { hideCards, disableVoting, hideCount };

    return Object.entries(options).map(([key, { label, checked }], index) => (
      <Checkbox
        key={index}
        toggle
        label={label}
        checked={checked}
        name={`${key}.checked`}
        onChange={() => formik.setFieldValue(`${key}.checked`, !checked)}
      />
    ));
  };

  return (
    <Form size="small" onSubmit={formik.handleSubmit}>
      <Input
        name="name"
        placeholder="Enter board name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && formik.errors.name}
      />
      <Input
        name="maxVotes"
        placeholder="Enter board name"
        label="Max votes per user(whole board)"
        type="number"
        min="1"
        max="50"
        value={formik.values.maxVotes}
        onChange={formik.handleChange}
      />
      <Field label="Columns" />
      {renderedColumns}
      <Field>
        <a href="#" onClick={handleAddClick}>
          Add new column
        </a>
      </Field>
      <Field label="Options" />
      {renderedOptions()}
      <Button type="submit" color="facebook">
        Create
      </Button>
    </Form>
  );
};

export default BoardForm;
