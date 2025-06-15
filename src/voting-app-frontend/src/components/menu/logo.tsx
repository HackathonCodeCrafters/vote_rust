import { Image } from "@chakra-ui/react";
import React from "react";

interface LogoProps {
  name: string;
  color?: string; // Optional jika pakai img
  icon?: React.ReactNode;
  imageSrc?: string; // URL atau path gambar
  showPulse?: boolean; // opsional: untuk animasi titik hijau
}

const Logo: React.FC<LogoProps> = ({
  name,
  color = "linear-gradient(to right, #06b6d4, #8b5cf6)",
  icon,
  imageSrc,
  showPulse = true,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
          style={{ background: color }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            icon
          )}
        </div>
        {showPulse && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        )}
      </div>
      <span
        className="font-bold text-xl bg-clip-text text-transparent"
        style={{
          backgroundImage: color,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default Logo;
