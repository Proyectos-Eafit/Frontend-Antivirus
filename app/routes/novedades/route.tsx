import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Cards from "~/components/Cards";
import Carousel from "~/components/CarouselNovedades";
import FilterSearch from "~/components/FilterSearch";

type CardProps = {
  image: string;
  title: string;
  description: string;
  buttonLink: string;
};

export const loader: LoaderFunction = async () => {
  const cards: CardProps[] = [
    {
      image: "https://via.placeholder.com/300",
      title: "Tarjeta 1",
      description: "Descripción breve de la tarjeta 1",
      buttonLink: "/detalle/1",
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Tarjeta 2",
      description: "Descripción breve de la tarjeta 2",
      buttonLink: "/detalle/2",
    },
    // Agrega más tarjetas aquí...
  ];

  return json(cards);
};

export default function novedadesLayout() {
  return (
    <div className="text-gray-800 flex flex-col items-center justify-center text-center">
      <h1 className="text-[#1D1856] text-[70px] font-bold">Novedades</h1>
      {/* <div className="max-w-screen-md w-full"> */}
      <div>
        <Carousel></Carousel>
      </div>

      <FilterSearch>    
      </FilterSearch>

      <h2 className="text-[#1D1856] text-[52px] font-bold">
        ¡Oportunidades para estudiar!
      </h2>

      <div className="grid grid-cols-2 gap-8 py-12">
        <Cards
          image={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6JuA2EignVtaNyNT7aemS1KaAqTsFznx1jA&s"
          }
          title={"Test"}
          description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis blandit elit. Curabitur sed nunc mauris. Mauris tempor quis diam a consequat. Integer varius turpis eu sapien dignissim condimentum. Donec ultrices mi eget magna posuere, quis placerat ligula aliquam. Duis cursus dolor quis tellus vehicula sollicitudin at ut mi. Integer non turpis nunc. Fusce sit amet varius mauris, eget facilisis urna. Etiam nec dui vestibulum, condimentum neque et, fringilla ipsum. Nulla pharetra non purus et luctus. Mauris pellentesque ultrices justo vel ultricies. Proin dignissim risus eget nibh suscipit volutpat. Aliquam a suscipit diam. Pellentesque ultricies sem et iaculis ultricies. Proin laoreet nunc vel elit porta posuere. Donec in ante vel purus porta fermentum."}
          buttonLink={"https://remix.run/docs/en/main/components/form"}
        ></Cards>
        <Cards
          image={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6JuA2EignVtaNyNT7aemS1KaAqTsFznx1jA&s"
          }
          title={"Test"}
          description={"Esta es una descripción de prueba para esta tarjeta"}
          buttonLink={"https://remix.run/docs/en/main/components/form"}
        ></Cards>
        <Cards
          image={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6JuA2EignVtaNyNT7aemS1KaAqTsFznx1jA&s"
          }
          title={"Test"}
          description={"Esta es una descripción de prueba para esta tarjeta"}
          buttonLink={"https://remix.run/docs/en/main/components/form"}
        ></Cards>
        <Cards
          image={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6JuA2EignVtaNyNT7aemS1KaAqTsFznx1jA&s"
          }
          title={"Test"}
          description={"Esta es una descripción de prueba para esta tarjeta"}
          buttonLink={"https://remix.run/docs/en/main/components/form"}
        ></Cards>
      </div>
      {/* <Cards></Cards>
      <Cards></Cards> */}
    </div>
  );
}
