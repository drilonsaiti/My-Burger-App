import React, { useState } from "react";
import "./Input.css";

const Input = (props) => {
    const [isTouched, setIsTouched] = useState(false);
    let inputClasses = ["InputElement"];

    if (isTouched && props.invalid && props.shouldValidate ) {
        inputClasses.push("Invalid");
    }

    const handleInputChange = (event) => {
        setIsTouched(true);
        props.changed(event);
    };

    const handleInputBlur = () => {
        setIsTouched(true);
    };

    let inputElement = null;

    switch (props.elementType) {
        case "input":
            inputElement = (
                <input
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />
            );
            break;
        case "select":
            inputElement = (
                <select
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                >
                    {props.elementConfig.options.map((op) => (
                        <option key={op.value} value={op.value}>
                            {op.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={inputClasses.join(" ")}
                    {...props.shouldValidate}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />
            );
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
