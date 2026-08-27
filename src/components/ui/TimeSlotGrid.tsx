
interface TimeSlotGridProps {
  slots: string[];
  selectedSlot: string | null;
  onSelect: (slot: string) => void;
}

export function TimeSlotGrid({ slots, selectedSlot, onSelect }: TimeSlotGridProps) {
  if (slots.length === 0) {
    return (
      <div className="p-6 text-center rounded-lg" style={{ backgroundColor: 'var(--color-surface-warm)', color: 'var(--color-graphite-light)' }}>
        No time slots available for this date.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
      {slots.map((slot) => {
        const isSelected = selectedSlot === slot;
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onSelect(slot)}
            className={`py-3 px-2 rounded-lg text-sm font-bold border transition-colors min-h-[44px] ${isSelected ? 'ring-2 ring-offset-1' : 'hover:opacity-90'}`}
            style={{
              backgroundColor: isSelected ? 'var(--color-indigo)' : 'var(--color-surface)',
              color: isSelected ? 'var(--color-surface)' : 'var(--color-graphite)',
              borderColor: isSelected ? 'var(--color-indigo)' : 'var(--color-ivory-dark)',
            }}
            aria-pressed={isSelected}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
