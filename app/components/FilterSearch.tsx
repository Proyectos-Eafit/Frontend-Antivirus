import { Form } from "@remix-run/react";

export default function FilterSearch() {
  return (
    <>
      <div className="p-10 m">
        <Form className="border border-l-yellow-950">
          <input
            type="text"
            name="Search Bar"
            id=""
            className="border border-gray-300 p-2 text-black bg-white"
          />

          <div>
          <label htmlFor="change">¡Filtra tu búsqueda!</label>
            <input
              type="date"
              name="change"
              value="dd-mm-yyyy"
              className="border border-gray-300 p-2 text-black bg-white"
            />
          </div>

          <div>
            <label htmlFor="location">Ubicación</label>            
            <select
              name="location"
              id="location"
              className="border border-gray-300 p-2 text-black bg-white"
            >
              <option value="a">Medellín, Antioquia</option>
              <option value="b">B</option>
            </select>

            <label htmlFor="change">Tipo de oportunidad</label>
            <select
              name="location"
              id="location"
              className="border border-gray-300 p-2 text-black bg-white"
            >
              <option value="a">Educativa</option>
              <option value="b">B</option>
            </select>
            <label htmlFor="change">Sector</label>
            <select
              name="location"
              id="location"
              className="border border-gray-300 p-2 text-black bg-white"
            >
              <option value="a">Tecnología</option>
              <option value="b">B</option>
            </select>
            <button>Búsqueda</button>
            <button>Limpiar</button>
          </div>
        </Form>
      </div>
    </>
  );
}
