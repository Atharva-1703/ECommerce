
import Star from "./Star";

interface ratingProps{
    rating:number;
    size?:number
}

export default function Ratings({rating,size=24}:ratingProps) {
    return(
        <div className="flex items-center gap-1">
            
            {Array.from({length:5}).map((_,idx:number)=>{
            const filllevel=Math.min(Math.max(rating-idx,0),1);
            return <Star key={idx} size={size} fillLevel={filllevel} />
        })}
        </div>
    )
}