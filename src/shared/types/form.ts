export type FieldType = 'button' | 'checkbox' | 'input' | 'textarea' | 'select'
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel'

export interface SelectOption {
    label: string
    value: string | number
}

export interface FormField {
    name: string
    type: FieldType
    label?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    inputType?: InputType
    rows?: number
    options?: SelectOption[]
    checkboxLabel?: string
}

export type FormData = Record<string, any>
