import { FC } from "react";
import type { IconType } from "react-icons";
import { FaUser, FaLock, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa6";

// Define your type and interface as usual
type IconMap = Record<string, IconType>;

interface IDynamicIcon extends React.SVGProps<SVGSVGElement> {
  icon: string;
  className?: string;
}

// Map all the icons you'll be using to their names
const iconMap: IconMap = {
  "FaUser": FaUser,
  "FaLock": FaLock,
  "FaYoutube": FaYoutube,
  "FaLinkedin": FaLinkedin,
  "FaGithub": FaGithub,
  // Add more icons as necessary...
};

const DynamicIcon: FC<IDynamicIcon> = ({ icon, ...props }) => {
  const Icon = iconMap[icon];

  if (!Icon) {
    return <span className="text-sm">Icon not found</span>;
  }

  return <Icon {...props} />;
};

export default DynamicIcon;
