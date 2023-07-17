export interface FieldData {
  defaultValue: string | number | boolean;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string | RegExp;
  type?: string;
  options?: { value: string | number; label: string }[];
}
