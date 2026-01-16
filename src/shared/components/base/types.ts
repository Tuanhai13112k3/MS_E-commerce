import { InputHTMLAttributes, ReactNode } from "react";
import { Control } from "react-hook-form";

export type ComponentSize = "sm" | "md" | "lg";

export type OptionType = {
  label: string;
  value: string | number;
};

export type BaseButtonType =
  | "primary"
  | "secondary"
  | "outline"
  | "link"
  | "danger";
export type FieldType = "text" | "date" | "image" | "number";
export interface BaseButtonProps {
  type?: BaseButtonType;
  size?: ComponentSize;
  isDisabled?: boolean;
  children: ReactNode;
  handleClick?: () => void;
}

export interface BaseComboxProps {
  name: string;
  control: Control<any>;
  size?: ComponentSize;
  label?: string;
  placeHolder?: string;
  options: OptionType[];
  isMulti?: boolean;
  isDisabled?: boolean;
}

export interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: ComponentSize;
  placeHolder?: string;
  isDisabled?: boolean;
  isReadonly?: boolean;
  errorMsg?: string;
}

export interface BasePopupProps {
  visible?: boolean;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}
// Định nghĩa cấu trúc 1 cột
export interface TableField<T> {
  key: keyof T | "action"; // Key phải nằm trong các thuộc tính của T hoặc là chuỗi 'action'
  label: string;
  type: FieldType;
}

// Generics T: Kiểu dữ liệu của từng dòng
// T extends { id: ... }: Bắt buộc dữ liệu phải có ID để làm key cho React
export interface BaseTableProps<T extends { id: string | number }> {
  fields: TableField<T>[];
  data: T[];
  children?: ReactNode;
  onRowDoubleClick?: (item: T) => void;
}
