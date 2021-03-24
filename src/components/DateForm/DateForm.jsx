import React from 'react';
import { Field, reduxForm } from 'redux-form';

import DatePicker, {
  FieldDatePicker,
  formatDates,
  normalizeDates,
} from '../DatePicker/DatePicker';

const Form = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldDatePicker name="dateStart" placeholder="Date Created" />
      <Field
        name={'dateEnd'}
        component={DatePicker}
        placeholder="Pick a Date"
        parse={normalizeDates}
        format={formatDates}
      />
    </form>
  );
};

export default reduxForm({
  form: 'sample',
})(Form);
