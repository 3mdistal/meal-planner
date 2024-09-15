import { component$, Slot, type QwikIntrinsicElements } from "@builder.io/qwik";
import { type JSX } from "@builder.io/qwik";
import styles from "./Button.module.css";

export type ButtonProps = QwikIntrinsicElements["button"] & {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  fullWidth?: boolean;
  loading?: boolean;
  icon?: JSX.Element;
};

export const Button = component$<ButtonProps>(
  ({
    class: className,
    variant = "default",
    size = "default",
    fullWidth = false,
    loading = false,
    icon,
    disabled,
    ...props
  }) => {
    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        class={buttonClasses}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && <span class={styles.spinner} aria-label="Loading" />}
        {icon && <span class={styles.icon}>{icon}</span>}
        <Slot />
      </button>
    );
  }
);
