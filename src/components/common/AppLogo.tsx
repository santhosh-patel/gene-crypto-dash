
import React from "react";

interface AppLogoProps {
  className?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ className }) => {
  return (
    <img
      src="/lovable-uploads/3a88d29f-3fd9-439b-93a7-ea1511f4b360.png"
      alt="CrypGene Logo"
      className={className}
    />
  );
};

export default AppLogo;
