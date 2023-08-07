import ProductsContainer from 'components/Products';
import { useProduct } from 'hooks/useProducts';
import { useParams } from 'react-router-dom';

const Search = () => {
    const { slug } = useParams()
    const { data: product, isLoading } = useProduct(slug);
    if (product) {
        console.log(product.slice(0, -1))
        var product_data = product.slice(0, -1)
    }
    return (
        <div>
            {isLoading || product_data.length === 0 ? (
                <h2 className='ml-5 mb-5 text-gray-900 text-3xl title-font font-medium'>Product not found</h2>

            ) : (
                <div>
                    <h2 className='ml-5 mb-5 text-gray-900 text-3xl title-font font-medium'>Found {product_data.length} product contains "{slug}"</h2>
                    <ProductsContainer products_data={product_data} limit={null} />
                </div>
            )}
        </div>
    );
};

export default Search;
