import { useState, useRef } from 'react'
import { Maximize2, X, Compass } from 'lucide-react'

export interface GalleryPhoto {
  id: number
  url: string
  location: string
  code: string
  caption: string
}

const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    url: 'https://firebasestorage.googleapis.com/v0/b/generacionsoftware-d979b.firebasestorage.app/o/nosotros%2F20180718_092241.jpg?alt=media&token=d1e26c2f-30ef-47e4-a6a1-9ce3365f3bf1',
    location: 'MONTERREY, NL',
    code: 'IMG-3501',
    caption: 'Sesión presencial de pentesting y análisis de código'
  },
  {
    id: 2,
    url: 'https://firebasestorage.googleapis.com/v0/b/generacionsoftware-d979b.firebasestorage.app/o/nosotros%2F21463140_698268703712989_5170981814185289770_n.jpg?alt=media&token=e4a8aa3f-de98-4b5e-8af1-3f2945288b9c',
    location: 'PANAMÁ',
    code: 'IMG-3502',
    caption: 'Certificación Ethical Hacking CPP350'
  },
  {
    id: 3,
    url: 'https://firebasestorage.googleapis.com/v0/b/generacionsoftware-d979b.firebasestorage.app/o/nosotros%2F41446543_2372893662727146_1780445513934438400_n.jpg?alt=media&token=5bcefe06-bf1f-4a53-8a71-694ceedbc6ed',
    location: 'CDMX',
    code: 'IMG-3503',
    caption: 'Taller práctico de respuesta ante incidentes'
  },
  {
    id: 4,
    url: 'https://firebasestorage.googleapis.com/v0/b/generacionsoftware-d979b.firebasestorage.app/o/nosotros%2F41617480_895970560609468_9158677.jpg?alt=media&token=1116a8f9-11ca-46ac-99c8-921df1bc86d5',
    location: 'BOGOTÁ',
    code: 'IMG-3504',
    caption: 'Simulación de ataques en vivo y laboratorio'
  },
  {
    id: 5,
    url: 'https://firebasestorage.googleapis.com/v0/b/generacionsoftware-d979b.firebasestorage.app/o/nosotros%2FBlogDragon1.jpg?alt=media&token=33843461-8353-4002-ad45-65511a9d1dc9',
    location: 'SANTIAGO',
    code: 'IMG-3505',
    caption: 'Auditoría de infraestructura e ingeniería social'
  }
]

export default function ImageSkewGallery() {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null)
  const [isHovered, setIsHovered] = useState(false)

 
  const marqueeItems = [...galleryPhotos, ...galleryPhotos]

  return (
    <section className="relative w-full bg-night py-16 text-white overflow-hidden select-none">
      
    
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-volt animate-ping" />
            <span className="font-code text-[10px] uppercase tracking-[0.3em] text-volt">
              // ARCHIVO_FOTOGRÁFICO
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl uppercase">
            Experiencias & Entrenamientos
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-code text-[10px] text-gray-500 uppercase tracking-widest">
          <Compass size={12} className="text-volt" />
          <span>GALERÍA_INTERACTIVA</span>
        </div>
      </div>

     
      <div 
        className="relative w-full bg-white/[0.012] py-6 border-y border-white/10 overflow-hidden"
        style={{
          clipPath: 'polygon(0 6%, 100% 0, 100% 94%, 0 100%)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-volt/70 to-transparent shadow-[0_0_12px_#ccff00]" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-volt/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(#ccff00_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

        <div 
          className={`flex w-max gap-4 md:gap-5 ${
            isHovered ? '[animation-play-state:paused]' : 'animate-[skewMarquee_30s_linear_infinite]'
          }`}
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setActivePhoto(item)}
              className="group relative flex-shrink-0 w-[280px] sm:w-[340px] md:w-[400px] h-[220px] sm:h-[260px] border border-white/10 bg-night cursor-pointer overflow-hidden transition-all duration-300 hover:border-volt hover:shadow-[0_0_25px_rgba(204,255,0,0.22)] hover:scale-[1.015]"
              style={{
                clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 0 100%)'
              }}
            >
              <img
                src={item.url}
                alt={item.caption}
                className="h-full w-full object-cover grayscale contrast-125 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

              <div className="absolute top-3 left-3 bg-night/90 border border-white/10 px-2.5 py-0.5 backdrop-blur-md transition-colors group-hover:border-volt/50">
                <span className="font-code text-[9px] uppercase tracking-widest text-volt">
                  {item.location}
                </span>
              </div>

          
              <div className="absolute top-3 right-3 font-code text-[9px] text-gray-500 group-hover:text-white transition-colors">
                [{item.code}]
              </div>

            
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                <span className="font-code text-[10px] text-gray-400 group-hover:text-white truncate max-w-[80%] transition-colors">
                  {item.caption}
                </span>

                <div className="bg-volt/10 border border-volt/30 p-1.5 text-volt group-hover:bg-volt group-hover:text-night transition-all">
                  <Maximize2 size={11} />
                </div>
              </div>

              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-volt opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-5xl w-full border border-volt/40 bg-night p-2 shadow-[0_0_50px_rgba(204,255,0,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
         
            <div className="flex justify-between items-center p-3 border-b border-white/10 font-code text-xs mb-2">
              <span className="text-volt flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-volt animate-pulse" />
                {activePhoto.code} // {activePhoto.location}
              </span>

              <button 
                onClick={() => setActivePhoto(null)}
                className="flex items-center gap-1 text-gray-400 hover:text-volt border border-white/10 px-2 py-1 transition-colors"
              >
                <X size={14} /> ESC
              </button>
            </div>

           
            <div className="relative overflow-hidden max-h-[75vh] flex items-center justify-center bg-black/50">
              <img 
                src={activePhoto.url} 
                alt={activePhoto.caption} 
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

        
            <div className="p-3 font-code text-xs text-gray-300 border-t border-white/10 flex justify-between items-center">
              <span>{activePhoto.caption}</span>
              <span className="text-volt text-[10px]">EHC_GALLERY_NODE</span>
            </div>
          </div>
        </div>
      )}

      
      <style>{`
        @keyframes skewMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}