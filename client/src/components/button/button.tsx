import React from "react";

type Props = {
  btnType?: "default" | "grey" | "dashed";
  icon?: React.ReactNode;
  title?: string;
  onClick?: any;
};

const Button: React.FC<Props> = ({
  btnType = "default",
  icon,
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center px-2 items-center h-[40px] border rounded-sm border-gray-300 hover:border-gray-200 
      ${btnType === "dashed" ? "border-dashed rounded-lg" : "rounded-sm"} 
      ${btnType === "grey" ? "text-white bg-gray-500 hover:bg-gray-400" : ""}`} //Заменить с помощью clsx или cn
    >
      <div className="flex items-center">
        {icon}
        {title}
      </div>
    </button>
  );
};

export default Button;
