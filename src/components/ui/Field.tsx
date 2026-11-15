import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface FieldFrameProps {
  label: string;
  error?: string;
  hint?: string;
}

export interface InputFieldProps extends FieldFrameProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  multiline?: false;
}

export interface TextAreaFieldProps extends FieldFrameProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  multiline: true;
}

export type FieldProps = InputFieldProps | TextAreaFieldProps;

const controlClasses =
  'w-full rounded-field border bg-white px-4 text-base text-ink transition-colors placeholder:text-placeholder focus-visible:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40';

interface FieldFrameRenderProps extends FieldFrameProps {
  children: (controlProps: { id: string; 'aria-invalid': boolean; 'aria-describedby': string | undefined; borderClass: string }) => ReactNode;
}

function FieldFrame({ label, error, hint, children }: FieldFrameRenderProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-muted">
        {label}
      </label>
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
        borderClass: error ? 'border-danger' : 'border-line'
      })}
      {hint ? (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function InputField({ label, error, hint, className, ...rest }: Omit<InputFieldProps, 'multiline'>) {
  return (
    <FieldFrame label={label} error={error} hint={hint}>
      {({ borderClass, ...aria }) => (
        <input className={cn(controlClasses, borderClass, 'min-h-field', className)} {...aria} {...rest} />
      )}
    </FieldFrame>
  );
}

function TextAreaField({ label, error, hint, className, rows = 3, ...rest }: Omit<TextAreaFieldProps, 'multiline'>) {
  return (
    <FieldFrame label={label} error={error} hint={hint}>
      {({ borderClass, ...aria }) => (
        <textarea rows={rows} className={cn(controlClasses, borderClass, 'resize-none py-3', className)} {...aria} {...rest} />
      )}
    </FieldFrame>
  );
}

export function Field(props: FieldProps) {
  if (props.multiline) {
    const { multiline: _multiline, ...rest } = props;
    return <TextAreaField {...rest} />;
  }
  const { multiline: _multiline, ...rest } = props;
  return <InputField {...rest} />;
}
