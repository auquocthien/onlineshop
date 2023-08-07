/* eslint-disable no-unused-vars */
import ProductsContainer from 'components/Products';
import Hero from 'components/Hero';
import { useProductPaging, useProducts } from 'hooks/useProducts';
import { ProductsSkeleton } from 'components/Skelton';
import { ToastContainer } from 'react-toastify';
const Home = () => {
  const { data: products, isLoading } = useProductPaging(1);
  return (
    <>
      <Hero />
      {isLoading || !products ? (
        <ProductsSkeleton />
      ) : (
        <div>
          <div className='px-5 py-5 text-gray-900 text-2xl title-font mb-1'>Best Selling</div>
          <ProductsContainer products_data={products} limit={4} />
          <div className='px-5 py-5 text-gray-900 text-2xl title-font mb-1'>Another Product</div>
          <ProductsContainer products_data={products} />
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Home;
