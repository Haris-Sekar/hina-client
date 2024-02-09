export const FieldTypes = {
    INPUT: "input",
    CHECKBOX: "checkbox",
    RADIO: "radio",
    SELECT: "select",
    SWITCH: "switch",
};

export default interface IFormBuilder {
    title: string;
    sections: ISection[];
}

interface ISection {
    title: string;
    fields: IField[];
}

interface IField {
    name: string;
    type: string | ["input", "checkbox", "radio", "select", "switch"];
    placeHolder: string;
    onChange: Function;
    required?: boolean;
    onClick?: Function;
    startIcon?: Function;
    endIcon?: Function;
    tooltip?: string;
    helperText?: string;
}
