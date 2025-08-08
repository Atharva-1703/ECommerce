import { Icon } from "@iconify/react";

interface StarProps {
  size: number;
  fillLevel: number;
}

export default function Star({ size, fillLevel }: StarProps) {
  return (
    <div className={`relative`} style={{ width: size, height: size }}>
        
      <Icon icon="line-md:star-filled" className=" text-gray-300" width={size} height={size}/>
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${fillLevel * 100}%`, height: "100%" }}
      >
        <Icon icon="line-md:star-filled" className=" text-yellow-400" width={size} height={size} /> 
      </div>
    </div>
  );
}
