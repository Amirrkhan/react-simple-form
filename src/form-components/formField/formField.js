import React, { Component } from "react";

class formField extends Component {
  state = {
    inputValue: "",
    valid: false,
    touched: false
  };

  renderField = () => {
    const formData = this.props.formData;
    switch (formData.element) {
      case (formData.element = "input"):
        return (
          <div className="form__field">
            {formData.label ? (
              <label htmlFor="">{formData.labelText}</label>
            ) : null}
            <input
              type="text"
              onChange={event => this.changeHandler(event, false)}
              value={this.state.value}
              onBlur={event => this.changeHandler(event, true)}
              {...formData.config}
            />
            {this.validationMessageTemplate()}
          </div>
        );

      default:
        return null;
    }
  };

  changeHandler = (event, blur) => {
    const { valid, inputValue } = this.state;
    const { name } = this.props.formData.config;

    this.setState({
      inputValue: event.target.value,
      touched: blur
    });
    this.inputValidation(event, blur);
    if (blur) {
      this.props.isFieldValid(valid, inputValue, name);
    }
  };

  validationMessageTemplate = () => {
    const { valid, touched } = this.state;
    const validationMessage = this.props.formData.validationMessage;
    let validationMessageTemplate;
    if (touched) {
      !valid
        ? (validationMessageTemplate = (
            <span className="form__invalid--message">{validationMessage}</span>
          ))
        : (validationMessageTemplate = null);
    }
    return validationMessageTemplate;
  };

  inputValidation = () => {
    const { validation } = this.props.formData;
    const { inputValue } = this.state;

    if (validation.required) {
      if (inputValue) {
        if (validation.isNumber) {
          const regNumber = /^\d+$/;
          const finalRegex = this.regMessageCheck(regNumber);
          this.checkingInputForValid(finalRegex, inputValue);
        }
        if (validation.isEmail) {
          const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const finalRegex = this.regMessageCheck(regEmail);
          this.checkingInputForValid(finalRegex, inputValue);
        }
        if (validation.isString) {
        }
      }
    }
  };

  checkingInputForValid = (validationExpression, inputValue) => {
    if (validationExpression.test(inputValue)) {
      this.setState({
        valid: true
      });
    } else {
      this.setState({
        valid: false
      });
    }
  };

  regMessageCheck = defaultReg => {
    const { validation } = this.props.formData;
    const regexTemplate = validation.regexTemplate
      ? new RegExp(validation.regexTemplate.source)
      : null;
    const undefinedRegexTemplate = /(?:)/;

    if (regexTemplate.toString() === undefinedRegexTemplate.toString()) {
      console.log("Regex expression is not valid");
    }

    let finalRegex;
    if (regexTemplate.toString() !== undefinedRegexTemplate.toString()) {
      finalRegex = new RegExp(defaultReg.source + "|" + regexTemplate.source);
    } else {
      finalRegex = defaultReg;
    }

    return finalRegex;
  };

  render() {
    console.log(this.state.valid);
    return this.renderField();
  }
}

export default formField;
