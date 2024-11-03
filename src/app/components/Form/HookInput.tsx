"use client";

import { IInput } from "@/types";
import { Input } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";



type IProps = IInput

export default function Hookinput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,

}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const currentValue = useWatch({ name });

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
     value={currentValue || ""}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
    
    />
  );
}
