import React from 'react';
import { Bouquet, CEO, CandelAndBouquet, Fresheners } from '../assets/about';
import { Link } from 'react-router-dom';

const Aboutus = () => {
  const items = [
    {
      title: "Exceptional Collection",
      img: Bouquet,
      description: "Our exceptional collection, where we pride ourselves on offering a curated selection of the finest aquatic species for your aquarium. From the dazzling hues of Neon Tetras to the regal beauty of Betta fish and the intricate patterns of Discus."
    },
   
  ];

  return (
    <div className='w-full'>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-r border-black p-5 md:p-20 flex justify-center items-center flex-col gap-4">
          <p className={`text-4xl md:text-6xl font-['Ballet'_,cursive] my-3`}>About</p>
          <p className='text-4xl md:text-6xl tracking-wider font-semibold'>AquaFish</p>
          <p className='px-10 md:px-40 text-center'>we are passionate about providing enthusiasts with the highest quality fish and exceptional service.</p>
        </div>
        <div className="w-full h-full md:h-[850px] aspect-square filter contrast-75 grayscale-[30%]">
          <img src={CEO} alt="" className='w-full h-full object-cover aspect-square mx-auto block' />
        </div>
      </div>
      
      {items.map((item, index) => (
        <div className="grid grid-cols-1 md:grid-cols-2" key={index}>
          <div className={`w-full h-full object-center md:h-[800px] aspect-square filter contrast-75 grayscale-[30%] ${index === 1 ? 'order-2' : ''}`}>
            <img src={item.img} alt="" className='w-full h-full object-cover' />
          </div>
          <div className="md:p-20 border-x border-black flex flex-col justify-start">
            <h1 className='md:text-4xl text-2xl tracking-wide font-semibold mb-5'>{item.title}</h1>
            <p className='md:w-[600px]'>{item.description}</p>
          </div>
        </div>
      ))}
      <div className="w-full h-full flex items-center justify-center p-5 md:p-20 text-center text-black border-x border-black">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className='md:text-5xl text-3xl tracking-wide font-semibold mb-5'>Discover Our Beautiful Fish</h1>
          <p>Explore our diverse collection, where we showcase a wide array of vibrant and healthy fish species to elevate your aquarium experience. </p>
          <Link to={"/bouquet-shop/shop"} className='max-w-[70%] w-[50%] lg:w-[30%] uppercase px-5 py-3 text-white transition-all border border-black bg-blue-900 hover:bg-transparent hover:text-black mt-14'>shop now</Link>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;