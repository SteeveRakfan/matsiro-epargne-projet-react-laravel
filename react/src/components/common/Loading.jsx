export default function Loading({
  size = "md",
  color = "emerald",
  fullPage = false,
}) {
  // Gestion dynamique des tailles
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  // Gestion dynamique des couleurs Tailwind
  const colorClasses = {
    emerald: "border-emerald-600/20 border-t-emerald-600",
    blue: "border-blue-600/20 border-t-blue-600",
    white: "border-white/20 border-t-white",
  };

  const spinnerHtml = (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin rounded-full`}
      role="status"
    >
      <span className="sr-only">Chargement...</span>
    </div>
  );

  // Si l'option fullPage est activée, on centre le spinner sur tout l'écran
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-xs">
        {spinnerHtml}
      </div>
    );
  }

  // Sinon, on le centre simplement dans son conteneur parent
  return (
    <div className="flex items-center justify-center p-4">{spinnerHtml}</div>
  );
}
