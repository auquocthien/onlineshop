import React from 'react';
import { Link } from 'react-router-dom';

import useCategory from 'hooks/useCategory';
import { CategorySkeleton } from 'components/Skelton';

const Categories = () => {
  const { data: categories, isLoading } = useCategory();

  const categoryList = ({ id, name, slug }) => {
    if (slug === 'all') {
      return (
        <Link
          to={`/shop/all`}
          state={{ "page": 1 }}
          className='uppercase text-left tracking-wider font-bold cursor-pointer italic transform hover:scale-125 transition duration-700 ease-in-out'
          key={id}
        >
          {name}
        </Link>
      );
    }
    return (
      <Link
        to={`/shop/${slug}`}
        state={{ "page": 1 }}
        className='uppercase text-left tracking-wider font-bold cursor-pointer italic transform hover:scale-125 transition duration-700 ease-in-out'
        key={id}
      >
        {name}
      </Link>
    );
  };

  return (
    <ul className='flex flex-col space-y-10 mt-10 ml-5'>
      {categoryList({ id: 'All101', name: 'All product', slug: "all" })}
      {isLoading ? (
        <CategorySkeleton />
      ) : (
        categories?.map((category) => categoryList(category))
      )}
    </ul>
  );
};

export default Categories;
