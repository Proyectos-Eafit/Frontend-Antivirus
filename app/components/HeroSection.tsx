// app/components/HeroSection.tsx


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      
      <div className="container max-w-6xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="text-left">
            {}
            <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6 font-raleway">
              ¡Tu futuro inicia aquí!
            </h1>

            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-raleway">
              En la Fundación Antivirus para la Deserción creemos que cada persona merece acceso a las mejores oportunidades. Por eso, ofrecemos una plataforma personalizada donde puedes explorar becas, cursos y programas adaptados a tus intereses y necesidades.
            </p>
          </div>

          
          <div className="flex justify-center md:justify-end">
            <img
              src="app/assets/images/imageHero.svg" 
              alt="Imagen descriptiva"
              className="max-w-full h-auto" 
            />
          </div>
        </div>

        
        <div className="mt-12 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          {}
          <button className="bg-yellow-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-200 font-raleway">
            Contactános
          </button>

          
          <a
            href="/about" // Reemplazar ruta para apartado "sobre nosotros"
            className="text-lg md:text-xl text-blue-500 hover:text-blue-700 transition duration-200 font-raleway"
          >
            O   conoce sobre nosotros
          </a>
        </div>
      </div>
    </section>
  );
}