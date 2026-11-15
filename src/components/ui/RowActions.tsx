export interface RowActionsProps {
  editLabel?: string;
  removeLabel?: string;
  onEdit?: () => void;
  onRemove?: () => void;
}

export function RowActions({ editLabel = 'Edit', removeLabel = 'Archive', onEdit, onRemove }: RowActionsProps) {
  return (
    <div className="flex gap-4">
      <button type="button" onClick={onEdit} className="rounded text-sm font-semibold text-navy transition-colors hover:text-blue hover:underline">
        {editLabel}
      </button>
      <button type="button" onClick={onRemove} className="rounded text-sm font-semibold text-danger transition-colors hover:underline">
        {removeLabel}
      </button>
    </div>
  );
}
