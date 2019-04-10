import React, { Component } from "react";

import FormField from "./form-components/formField/formField";

const formData = {
  name: {
    element: "input",
    value: "",
    label: true,
    labelText: "Name",
    config: {
      name: "name_input",
      type: "text",
      placeholder: "Enter your name"
    },
    validation: {
      required: true,
      isString: true,
      minLen: 5,
      maxLen: 10
    },
    valid: false,
    touched: false,
    validationMessage: ""
  },
  email: {
    element: "input",
    value: "",
    label: true,
    labelText: "Email",
    config: {
      name: "email_input",
      type: "text",
      placeholder: "Enter your email"
    },
    validation: {
      required: true,
      isEmail: true,
      regexTemplate: "a"
    },
    valid: false,
    touched: false,
    validationMessage: "Email is not correct"
  },
  phone: {
    element: "input",
    value: "",
    label: true,
    labelText: "Phone Number",
    config: {
      name: "phone_input",
      type: "text",
      placeholder: "Enter your phone number"
    },
    validation: {
      required: true,
      isNumber: true,
      len: 10,
      regexTemplate: "a"
    },
    valid: false,
    touched: false,
    validationMessage: "Phone is not correct"
  }
};

class Form extends Component {
  state = {
    formFieldsToSubmit: {},
    isFormValid: false
  };

  isFieldValid = (isValid, inputValue, inputName) => {
    const { formFieldsToSubmit } = this.state;
    let arraysOfField = formFieldsToSubmit;

    if (formFieldsToSubmit[inputName]) {
      arraysOfField[inputName] = {
        isValid,
        inputValue
      };
      this.setState({
        formFieldsToSubmit: arraysOfField
      });
    }

    arraysOfField[inputName] = {
      isValid,
      inputValue
    };
    this.setState({
      formFieldsToSubmit: arraysOfField
    });
  };

  submitForm = () => {
    const { formFieldsToSubmit, isFormValid } = this.state;
    if (isFormValid) {
      alert("Success");
    } else {
      if (Object.keys(formFieldsToSubmit).length) {
        for (let field in formFieldsToSubmit) {
          if (!formFieldsToSubmit.hasOwnProperty(field)) continue;
          let obj = formFieldsToSubmit[field];
          console.log(obj);
          if (!obj.isValid) {
            alert(`${field} is not correct`);
          } else {
            this.setState({
              isFormValid: true
            });
          }
        }
      } else {
        alert("Fill all required fields before submission");
      }
    }
  };

  render() {
    console.log(this.state.formFieldsToSubmit);
    return (
      <div className="form">
        <FormField
          isFieldValid={(isValid, inputValue, inputName) =>
            this.isFieldValid(isValid, inputValue, inputName)
          }
          formData={formData.name}
        />
        <FormField
          formData={formData.email}
          isFieldValid={(isValid, inputValue, inputName) =>
            this.isFieldValid(isValid, inputValue, inputName)
          }
        />
        <FormField
          formData={formData.phone}
          isFieldValid={(isValid, inputValue, inputName) =>
            this.isFieldValid(isValid, inputValue, inputName)
          }
        />

        <button type="submit" onClick={this.submitForm}>
          Submit Form
        </button>
      </div>
    );
  }
}

export default Form;
