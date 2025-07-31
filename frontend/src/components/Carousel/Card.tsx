

interface CardProps{
    image: string,
    title:string,
    description:string,
    index:number,
    bgColor:string,
}

export default function Card({image,title,description,index,bgColor}:CardProps) {
    
  return (
    <section className={`flex flex-col ${index%2==0?'md:flex-row-reverse':'md:flex-row'} items-center gap-8 px-12 py-12 w-full h-[500px] rounded-2xl `} 
    style={{backgroundColor:bgColor}}>
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          {title}
        </h2>
        <p className="text-gray-600">
          {description}
        </p>
        <button className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
          Shop Now
        </button>
      </div>

      <div className="md:w-1/2">
        <img
          src={image}
          alt="Men's Watch"
          className="w-full object-contain h-[400px] rounded-xl "
        />
      </div>
    </section>
  );
}
