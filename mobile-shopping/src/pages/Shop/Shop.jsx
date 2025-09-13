    import { useState, Suspense, lazy, useEffect } from 'react';
    import { useNavigate, Routes, Route } from 'react-router-dom';
    // import { fetchAllProduct } from "../../services/ProductServices";
    import { fetchAllProductsThunk } from "../../redux/product/ProductThunk";
    import { useDispatch, useSelector } from "react-redux";
    import ProductCard from '../../components/Card/ProductCard'; 
    import Search from '../../components/Search/Search';
    import Filter1 from '../../components/Filter/Filter';
    import { FiFilter } from "react-icons/fi";
    import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
    import { Rate, Button, Row, Col } from "antd";
    import './Shop.css';

    // Lazy load Product component
    const Product = lazy(() => import('../Product/Product'));

    const ShopProductList = ({ handleViewProduct, collapsed }) => {
        const productItems = useSelector(state => state.product.allProducts);
        // const [listProducts, setListProducts] = useState([]);
        // const [filteredProducts, setFilteredProducts] = useState([]);
        // const [searchedProducts, setSearchedProducts] = useState([]);
        const [showFilter, setShowFilter] = useState(false);
        // useEffect(() => {
        //     setListProducts(productItems);
        //     setFilteredProducts(productItems);
        //     setSearchedProducts(productItems);
        // }, [productItems]);
        const [filter, setFilter] = useState({
            priceFrom: 0,
            priceTo: 50000000,
            ratingFrom: 0,
            ratingTo: 5
        });
        const [pendingFilter, setPendingFilter] = useState(filter);
        const [search, setSearch] = useState("");
        
        const handleFilterChange = (newFilter) => {
            setPendingFilter(newFilter);
        };

        const handleApplyFilter = () => {
            setFilter(pendingFilter);
        }

        const handleResetFilter = (resetFilters) => {
            setPendingFilter(resetFilters);
        }


        const searchProduct = (productItems || []).filter((p) => {
            const name = p.title || "";
            const priceText = p.price ? p.price.toString() : "";
            const priceValue = p.price;
            const rating = p.rating;
            
            const matchSearch =
                name.toLowerCase().includes(search.toLowerCase()) ||
                priceText.toLowerCase().includes(search.toLowerCase());

            const matchPrice = priceValue >= filter.priceFrom && priceValue <= filter.priceTo;

            const matchRating =
                rating >= filter.ratingFrom &&
                rating <= filter.ratingTo;

            return matchSearch && matchPrice && matchRating;
        });

        return (
            <div className={`shop-page${collapsed ? ' collapsed' : ''}`}>
                <div className='shop-header'>
                    <div>
                        <div className='shop-title text-2xl'>Shop</div>
                        <Breadcrumb />
                    </div>
                    <div className='shop-tool'>
                        <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
                        <Button icon={<FiFilter/>} className='filter-icon' 
                            onClick={() => setShowFilter(!showFilter)}
                        />
                        {showFilter && (
                            <div
                                className="filter-dropdown"
                                onMouseEnter={() => setShowFilter(true)}
                                onMouseLeave={() => setShowFilter(false)}
                                style={{
                                    position: 'absolute',
                                    top: '140px',
                                    right: 4,
                                    zIndex: 10
                                }}
                            >
                                <Filter1
                                    filter={pendingFilter} 
                                    onFilterChange={handleFilterChange}
                                    onReset={handleResetFilter}
                                    onApply={handleApplyFilter}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className='shop-product'>
                <Row gutter={[16, 16]}>
                    {searchProduct.length > 0 ? (
                    searchProduct.map(item => (
                        <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                        <ProductCard
                            product={item}
                            onClick={() => handleViewProduct(item.id)}
                        />
                        </Col>
                    ))
                    ) : (
                    <Col span={24} style={{ textAlign: "center", fontSize: 18 }}>
                        Không tìm thấy sản phẩm nào phù hợp với từ khóa "{search}"
                    </Col>
                    )}
                </Row>
                </div>
            </div>
        );
    };

    const Shop = () => {
        const dispatch = useDispatch();
        const allProducts = useSelector((state) => state.product.allProducts);
        const navigate = useNavigate();

        const handleViewProduct = (productId) => {
            navigate(`/product/${productId}`);
        };

        useEffect(() => {
            if (allProducts.length === 0) {
            dispatch(fetchAllProductsThunk());
            }
        }, [dispatch, allProducts.length]);

        return (
            <Routes>
                <Route 
                    index 
                    element={
                        <ShopProductList handleViewProduct={handleViewProduct}  />
                    } 
                />
                
                <Route
                    path="product/:id"
                    element={
                        <Suspense fallback={<div className="loading-spinner">Loading Product...</div>}>
                            <Product productItems={allProducts} />
                        </Suspense>
                    }
                />
            </Routes>
        );
    };

    export default Shop;