import { component$ } from "@builder.io/qwik";

interface SelectOptionProps {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export const SelectOption = component$<SelectOptionProps>(
  ({ value, label, disabled = false }) => {
    return (
      <option value={value} disabled={disabled}>
        {label}
      </option>
    );
  }
);
