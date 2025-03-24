import ServiceCard from './ServiceCard';

export default function ServiciosSection() {
  const servicios = [
    {
      id: 1,
      title: 'Pre-vocación',
      description: 'Un programa diseñado para estudiantes que están explorando sus intereses y habilidades. Ayudamos a los jóvenes a descubrir sus talentos y posibles caminos profesionales.',
      imageSrc: '/images/pre-vocacion.jpg',
      linkText: 'DETALLES',
      linkUrl: '/servicios/pre-vocacion'
    },
    {
      id: 2,
      title: 'Asesoría sociopsedagógica',
      description: 'Ofrecemos apoyo personalizado para estudiantes que enfrentan dificultades en su proceso de aprendizaje. Nuestros expertos trabajan en el desarrollo integral del estudiante.',
      imageSrc: '/images/asesoria.jpg',
      linkText: 'DETALLES',
      linkUrl: '/servicios/asesoria'
    },
    {
      id: 3,
      title: 'Test sociovocacional',
      description: 'Evaluaciones diseñadas para identificar intereses, aptitudes y preferencias de los estudiantes. Los resultados ayudan a tomar decisiones informadas sobre su futuro académico.',
      imageSrc: '/images/test.jpg',
      linkText: 'DETALLES',
      linkUrl: '/servicios/test'
    }
  ];

  return (
    <section id="servicios" className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-indigo-900 mb-12">Servicios</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map(servicio => (
            <ServiceCard
              key={servicio.id}
              title={servicio.title}
              description={servicio.description}
              imageSrc={servicio.imageSrc}
              linkText={servicio.linkText}
              linkUrl={servicio.linkUrl}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[1, 2, 3].map(dot => (
              <button
                key={dot}
                className={`w-2 h-2 rounded-full ${
                  dot === 1 ? 'bg-indigo-900' : 'bg-gray-300'
                }`}
                aria-label={`Ir a la página ${dot}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}