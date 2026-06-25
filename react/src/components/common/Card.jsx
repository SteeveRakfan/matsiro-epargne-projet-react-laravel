export default function Card({ ref, className, title, children }) {
  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden p-3 ${className}`}
      title={title}
    >
      {children}
    </div>
  );
}
