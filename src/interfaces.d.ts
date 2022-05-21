export interface FormFieldSelectOption {
    value: string,
    label: string
  }
  
  export interface FormFieldConfig {
    name: string,
    label?: string,
    input?: string
    maxlen?: number,
    validate?: string
    value?: string | boolean,
    required?: boolean,
    placeholder?: string,
    classes?: string,
    options?: FormFieldSelectOption[]
  }
  
  export interface FormConfig {
    name: string,
    selector: string,
    action: string,
    title?: string,
    fields: FormFieldConfig[],
    submit?: string
  }