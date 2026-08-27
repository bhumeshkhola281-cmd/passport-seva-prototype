import { ReactNode, useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

type DeskNoteProps = {
  title?: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function DeskNote({ title = 'Helpful note', children, defaultOpen = true }: DeskNoteProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <aside
      className="rounded-xl border p-4"
      style={{
        backgroundColor: 'var(--color-surface-warm)',
        borderColor: 'var(--color-ivory-dark)',
      }}
      aria-label={title}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full bg-transparent border-0 p-0 cursor-pointer"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--color-indigo)' }}>
          <HelpCircle size={16} />
          {title}
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-graphite-light)' }}>
          {children}
        </div>
      )}
    </aside>
  );
}
