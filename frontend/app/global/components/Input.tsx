"use client";

import { useState } from "react";
import { REGEX_EMAIL } from "@/app/global/store/validation";
import "../styles/validation.css";

// Defining the validations
type Validation = {
  autoComplete?: string;
  title?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
};

// Defininng inputfields

// Bruger '&' operatør sådan så input's indeholder alle de felter fra Validation
// TypeScript kalder det for en intersection Type opertør.
// source: https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html
//         https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces

//text
type inputTextField = {
  type: "text";
  name: string;
  value: string;
  label: string;
  inputLabel: string;
  onChange: (value: string) => void;
} & Validation;
//text
type inputEmail = {
  type: "email";
  name: string;
  value: string;
  label: string;
  inputLabel: string;
  onChange: (value: string) => void;
} & Validation;

// phonenumber
type inputTel = {
  type: "tel";
  name: string;
  value: string;
  label: string;
  inputLabel: string;
  onChange: (value: string) => void;
} & Validation;

// password
type inputPassword = {
  type: "password";
  name: string;
  value: string;
  label: string;
  inputLabel: string;
  onChange: (value: string) => void;
} & Validation;

//number
type inputNumber = {
  type: "number";
  name: string;
  value: number;
  label: string;
  inputLabel: string;
  inputMode: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  max?: number;
  min?: number;
  onChange: (value: number) => void;
} & Validation;

//checkbox
type inputCheckbox = {
  type: "checkbox";
  checked: boolean;
  name: string;
  label: string;
  inputLabel: string;
  onChange: (value: boolean) => void;
} & Validation;

//radio
type inputRadio = {
  type: "radio";
  name: string;
  label: string;
  inputLabel: string;
  onChange: (value: string) => void;
} & Validation;

// Using 'or' operator for changing type of inputfield
type inputType =
  | inputTextField
  |inputEmail
  | inputTel
  | inputPassword
  | inputNumber
  | inputCheckbox
  | inputRadio;


//for validations so that we can show error or success live instead of only when we
//hit submit.
// Returns a human-readable hint based on the input type and length constraints.
// Returns null if no hint is needed (e.g. no minLength defined).
function getHintText(type: string, minLength?: number, maxLength?: number): string | null {
  if (type === "email") return "Must be a valid email address";
  if (minLength && maxLength) return `Must be between ${minLength} and ${maxLength} characters`;
  if (minLength) return `Must be at least ${minLength} characters`;
  return null;
}

// Returns a CSS class based on whether the value is valid, invalid, or empty.
// Uses REGEX_EMAIL for email validation, minLength for everything else.
// "error" and "success" map to classes in validation.css.
function getValidationClass(value: string, type?: string, minLength?: number) {
  if (value.length === 0) return "bg-surface border-primary-100 border-2";

  if (type === "email") {
    return REGEX_EMAIL.test(value) ? "success" : "error";
  }

  if (!minLength) return "bg-surface border-primary-100 border-2";
  return value.length < minLength ? "error" : "success";
}

// Adding conditional rendering for changing each input fields props & actions
export default function Input(props: inputType) {
  // Tracks whether the input is currently focused so we can show the hint on focus
  const [isFocused, setIsFocused] = useState(false);

  const hint = getHintText(props.type, props.minLength, props.maxLength);
  // inputNumber and checkbox don't have a string value, so we safely fall back to ""
  const stringValue = typeof (props as any).value === "string" ? (props as any).value as string : "";
  const isInvalid = getValidationClass(stringValue, props.type, props.minLength) === "error";
  // Show hint when focused (user is typing) OR when the value is invalid (user has left the field with bad input)
  const showHint = isFocused || isInvalid;

  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor={props.label} className="font-bold">{props.inputLabel}</label>

      {/* Text Inputfield */}
      {props.type === "text" && (
        <input
          id={props.name}
          type="text"
          value={props.value}
          name={props.name}
          required={props.required}
          title={props.title}
          minLength={props.minLength}
          maxLength={props.maxLength}
          pattern={props.pattern}
          autoComplete={props.autoComplete}
          onChange={(e) => props.onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getValidationClass(props.value, props.type, props.minLength)}
        ></input>
      )}
      {/* Email Inputfield */}
      {props.type === "email" && (
        <input
          id={props.name}
          type="email"
          value={props.value}
          name={props.name}
          required={props.required}
          title={props.title}
          minLength={props.minLength}
          maxLength={props.maxLength}
          pattern={props.pattern}
          autoComplete={props.autoComplete}
          onChange={(e) => props.onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getValidationClass(props.value, props.type, props.minLength)}
        ></input>
      )}

      {/* Phonenumber Inputfield */}
      {props.type === "tel" && (
        <input
          id={props.name}
          type="tel"
          value={props.value}
          name={props.name}
          required={props.required}
          title={props.title}
          minLength={props.minLength}
          maxLength={props.maxLength}
          pattern={props.pattern}
          autoComplete={props.autoComplete}
          onChange={(e) => props.onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getValidationClass(props.value, props.type, props.minLength)}
        ></input>
      )}

      {/* Password Inputfield */}
      {props.type === "password" && (
        <input
          id={props.name}
          type="password"
          value={props.value}
          name={props.name}
          required={props.required}
          title={props.title}
          minLength={props.minLength}
          maxLength={props.maxLength}
          pattern={props.pattern}
          autoComplete={props.autoComplete}
          onChange={(e) => props.onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getValidationClass(props.value, props.type, props.minLength)}
        ></input>
      )}

      {/* Number Inputfield */}
      {props.type === "number" && (
        <input
          id={props.name}
          type="number"
          value={props.value}
          name={props.name}
          inputMode={props.inputMode}
          required={props.required}
          title={props.title}
          minLength={props.minLength}
          maxLength={props.maxLength}
          pattern={props.pattern}
          autoComplete={props.autoComplete}
          onChange={(e) => props.onChange(Number(e.target.value))}
          className="bg-surface border-primary-100 border-2"
        ></input>
      )}

      {/* Checkbox Inputfield */}
      {props.type === "checkbox" && (
        <input
          id={props.name}
          type="checkbox"
          name={props.name}
          required={props.required}
          title={props.title}
          autoComplete={props.autoComplete}
          pattern={props.pattern}
          checked={props.checked}
          onChange={(e) => props.onChange(e.target.checked)}
          className="bg-surface border-primary-100 border-2"
        ></input>
      )}

      {/* Radio Inputfield */}
      {props.type === "radio" && (
        <input
          id={props.name}
          type="radio"
          name={props.name}
          required={props.required}
          title={props.title}
          autoComplete={props.autoComplete}
          pattern={props.pattern}
          onChange={(e) => props.onChange(e.target.value)}
          className="bg-surface border-primary-100 border-2"
        ></input>
      )}


      {/* showHint — is the input currently focused or invalid? If false, stop here, render nothing.
      hint — does this input type even have a hint string? If "" or undefined, stop here, render nothing.
      <span className="text-sm text-grey-200">{hint}</span> — only if both are truthy, render the span with the hint text inside. */}
      {showHint && hint && <span className="text-sm text-grey-200">{hint}</span>}
    </div>
  );
}
