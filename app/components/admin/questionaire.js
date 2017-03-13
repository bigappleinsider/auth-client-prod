import React, { Component } from 'react';

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className={`form-group ${error && touched ? 'has-danger' : ''}`}>
    <label>{label}</label>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && ((error && <span className="text-help">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);
const required = value => value ? undefined : 'Required';


class Questionaire extends Component {
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
  }
  componentWillMount() {
    if (this.props.params.id !== 'new') {
      this.props.fetchQuestionaire(this.props.params.id);
    }
  }
  handleFormSubmit({ name }) {
    if(this.props.params.id !== 'new') {
      this.props.updateQuestionaire({ id: this.props.params.id, name: name });
    }
    else{
      this.props.createQuestionaire({ name });
    }
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="name"
          label="Name"
          validate={[ required ]}
          component={renderField}
          type="text" />
          <button type="submit" className="btn btn-primary">Save</button>
      </form>
    );
  }
}

Questionaire = reduxForm({
  form: 'questionaire',
  enableReinitialize: true,
  fields: ['name']

})(Questionaire);
export default connect(state => ({
  initialValues: state.questionaire.questionaire
}), actions)(Questionaire);
