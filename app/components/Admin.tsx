import { useEffect, useState } from "react";
import axios from "axios";

// Definición de interfaces para los datos
interface Opportunity {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

interface Benefit {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

export default function Admin() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<{
    id: number | null;
    name: string;
    description: string;
    image_url: string;
    type: "opportunity" | "service" | "benefit";
  }>({
    id: null,
    name: "",
    description: "",
    image_url: "",
    type: "opportunity", // Tipo por defecto
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false); // Estado para mostrar el modal
  const [message, setMessage] = useState<string>("");

  const API_BASE_URL = "http://localhost:5281/api";

  // Configurar Axios para incluir el token JWT
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  // Interceptor para agregar el token JWT a cada solicitud
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken"); // Obtener el token del almacenamiento local
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado Authorization
    }
    return config;
  });

  // Obtener oportunidades, servicios y beneficios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [opportunitiesResponse, servicesResponse, benefitsResponse] = await Promise.all([
          axiosInstance.get("/Opportunities"),
          axiosInstance.get("/Services"),
          axiosInstance.get("/Benefits"),
        ]);
        setOpportunities(opportunitiesResponse.data);
        setServices(servicesResponse.data);
        setBenefits(benefitsResponse.data);
      } catch (error: any) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    const endpoint =
      formData.type === "opportunity"
        ? "/Opportunities"
        : formData.type === "service"
        ? "/Services"
        : "/Benefits";

    try {
      if (isEditing) {
        await axiosInstance.put(`${endpoint}/${formData.id}`, formData);
        setMessage("Elemento actualizado exitosamente.");
      } else {
        await axiosInstance.post(endpoint, formData);
        setMessage("Elemento creado exitosamente.");
      }
      resetForm();
      refreshData();
      setShowModal(false); // Cerrar el modal después de guardar
    } catch (error: any) {
      console.error("Error al guardar el elemento:", error);
      setMessage("Hubo un error al guardar el elemento.");
    }
  };

  const handleDelete = async ({ id, type }: { id: number; type: "opportunity" | "service" | "benefit" }) => {
    const endpoint =
      type === "opportunity"
        ? "/Opportunities"
        : type === "service"
        ? "/Services"
        : "/Benefits";

    try {
      await axiosInstance.delete(`${endpoint}/${id}`);
      setMessage("Elemento eliminado exitosamente.");
      refreshData();
    } catch (error: any) {
      console.error("Error al eliminar el elemento:", error);
      setMessage("Hubo un error al eliminar el elemento.");
    }
  };

  const handleEdit = (item: Opportunity | Service | Benefit, type: "opportunity" | "service" | "benefit") => {
    setFormData({
      id: item.id,
      name: "title" in item ? item.title : item.name,
      description: item.description || "",
      image_url: item.image_url,
      type,
    });
    setIsEditing(true);
    setShowModal(true); // Mostrar el modal al editar
  };

  const refreshData = async () => {
    try {
      const [opportunitiesResponse, servicesResponse, benefitsResponse] = await Promise.all([
        axiosInstance.get("/Opportunities"),
        axiosInstance.get("/Services"),
        axiosInstance.get("/Benefits"),
      ]);
      setOpportunities(opportunitiesResponse.data);
      setServices(servicesResponse.data);
      setBenefits(benefitsResponse.data);
    } catch (error: any) {
      console.error("Error al refrescar los datos:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      description: "",
      image_url: "",
      type: "opportunity",
    });
    setIsEditing(false);
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">Panel de Administración</h1>

      {/* Formulario para crear elementos */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-700">{isEditing ? "Editar" : "Crear"} Elemento</h2>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-semibold mb-2">Tipo</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded bg-gray-100 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isEditing}
          >
            <option value="opportunity">Oportunidad</option>
            <option value="service">Servicio</option>
            <option value="benefit">Beneficio</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded bg-gray-100 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded bg-gray-100 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image_url" className="block text-gray-700 font-semibold mb-2">URL de la Imagen</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded bg-gray-100 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-5 rounded hover:bg-blue-600 transition duration-200">
          {isEditing ? "Actualizar" : "Crear"}
        </button>
        <button type="button" onClick={resetForm} className="ml-4 bg-gray-500 text-white font-bold py-3 px-5 rounded hover:bg-gray-600 transition duration-200">
          Cancelar
        </button>
      </form>

      {message && <p className="text-center text-green-500 font-bold mb-4">{message}</p>}

      {/* Listado de oportunidades */}
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Oportunidades</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={opportunity.image_url} alt={opportunity.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-bold">{opportunity.name}</h3>
            <p className="text-gray-600">{opportunity.description}</p>
            <div className="mt-4 flex justify-between">
              <button onClick={() => handleEdit(opportunity, "opportunity")} className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">
                Editar
              </button>
              <button onClick={() => handleDelete({ id: opportunity.id, type: "opportunity" })} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Listado de servicios */}
      <h2 className="text-2xl font-bold text-blue-900 mt-8 mb-4">Servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={service.image_url} alt={service.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-bold">{service.name}</h3>
            <p className="text-gray-600">{service.description}</p>
            <div className="mt-4 flex justify-between">
              <button onClick={() => handleEdit(service, "service")} className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">
                Editar
              </button>
              <button onClick={() => handleDelete({ id: service.id, type: "service" })} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Listado de beneficios */}
      <h2 className="text-2xl font-bold text-blue-900 mt-8 mb-4">Beneficios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={benefit.image_url} alt={benefit.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-bold">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
            <div className="mt-4 flex justify-between">
              <button onClick={() => handleEdit(benefit, "benefit")} className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">
                Editar
              </button>
              <button onClick={() => handleDelete({ id: benefit.id, type: "benefit" })} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Editar" : "Crear"} Elemento</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded bg-gray-100 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded bg-gray-100 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="image_url" className="block text-gray-700 font-semibold mb-2">URL de la Imagen</label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded bg-gray-100 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}