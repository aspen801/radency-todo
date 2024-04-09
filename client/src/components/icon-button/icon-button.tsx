import React from "react";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onClick?: any;
  className?: string;
  icon?: React.ReactNode;
};

const IconButton: React.FC<Props> = ({ onClick, className, icon }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="icon"
      className={`${cn(className)} h-7 w-7`}
    >
      {icon ? <span>{icon}</span> : <EllipsisVertical className=" h-4 w-4" />}
    </Button>
  );
};

export default IconButton;
