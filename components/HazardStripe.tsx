export default function HazardStripe() {
  return (
    <div
      aria-hidden="true"
      className="h-2 w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--color-charcoal) 0, var(--color-charcoal) 10px, var(--color-safety-yellow) 10px, var(--color-safety-yellow) 20px)",
      }}
    />
  );
}
