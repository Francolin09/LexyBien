const Acordion = ({nombre,informacion, rol}:{nombre:string, informacion:string, rol:string}) => {
    return (
        <div className="grid divide-y bg-slate-950 max-w-xl mx-auto mt-8">
            <div className="py-5">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-neutral-50">{nombre}</span>
                        <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                </svg>
                </span>
                    </summary>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        {informacion}
                    </p>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        {rol}
                    </p>
                </details>
            </div>
        </div>      
    );
  };
  
  export default Acordion;