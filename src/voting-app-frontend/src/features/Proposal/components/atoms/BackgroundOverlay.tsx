interface BackgroundOverlayProps {
  onClose: () => void;
}

export default function BackgroundOverlay({ onClose }: BackgroundOverlayProps) {
  return (
    <div
      className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    ></div>
  );
}
