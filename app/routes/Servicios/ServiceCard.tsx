
import { Link } from '@remix-run/react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  linkText: string;
  linkUrl: string;
}

export default function ServiceCard({
  title,
  description,
  imageSrc,
  linkText,
  linkUrl
}: ServiceCardProps) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
        <div className="text-center mt-auto">
          <Link 
            to={linkUrl} 
            className="inline-block bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md text-sm"
          >
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}