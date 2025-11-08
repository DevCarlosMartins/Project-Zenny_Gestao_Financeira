interface OverlayProps {
  isVisible: boolean;
  onClick: () => void;
}

export const Overlay = ({ isVisible, onClick }: OverlayProps) => {
  if (!isVisible) return null;
  
  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200"
      onClick={onClick}
      aria-hidden="true"
    />
  );
};
