    import { useState, Suspense, lazy, useEffect } from 'react';
    import { useNavigate, Routes, Route } from 'react-router-dom';
    import { fetchAllProductStart } from '../../redux/product/ProductSlice';
    import { useDispatch, useSelector } from "react-redux";
    import ProductCard from '../../components/Card/ProductCard'; 
    import Search from '../../components/Search/Search';
    import Filter1 from '../../components/Filter/Filter';
    import { FiFilter } from "react-icons/fi";
    import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
    import { Pagination, Button, Row, Col } from "antd";
    import './Shop.css';

    // Lazy load Product component
    const Product = lazy(() => import('../Product/Product'));
    const defaultFilter = {
        priceFrom: 0,
        priceTo: 5000, 
        ratingFrom: 0,
        ratingTo: 5,
    };

    const ShopProductList = ({ handleViewProduct, collapsed }) => {
        const productItems = useSelector(state => state.product.allProducts);
        const [showFilter, setShowFilter] = useState(false);
        const [filter, setFilter] = useState(defaultFilter);
        const [pendingFilter, setPendingFilter] = useState(filter);
        const [filterKey, setFilterKey] = useState(0);
        const [search, setSearch] = useState("");
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(12);
        
        const handleFilterChange = (newFilter) => {
            setPendingFilter(newFilter);
        };

        const handleApplyFilter = () => {
            setFilter(pendingFilter);
            setCurrentPage(1);
        }

        const handleResetFilter = () => {
            setPendingFilter(defaultFilter);
            setFilterKey(prev => prev + 1);
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

        const totalProducts = searchProduct.length;
        const startIdx = (currentPage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        const currentProducts = searchProduct.slice(startIdx, endIdx);

        const handlePageChange = (page, size) => {
            setCurrentPage(page);
            if (size !== pageSize) {
                setPageSize(size);
                setCurrentPage(1);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        useEffect(() => {
            setCurrentPage(1);
        }, [search]);

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
                                style={{
                                    position: 'absolute',
                                    top: '140px',
                                    right: 4,
                                    zIndex: 10
                                }}
                            >
                                <Filter1
                                    key={filterKey}
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
                    {currentProducts.length > 0 ? (
                    currentProducts.map(item => (
                        <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                        <ProductCard
                            product={item}
                            onClick={() => handleViewProduct(item.id)}
                        />
                        </Col>
                    ))
                    ) : (
                    <Col span={24} style={{ textAlign: "center", fontSize: 18 }}>
                        Sản phẩm không tồn tại
                    </Col>
                    )}
                </Row>
                <div
                    style={{
                    padding: "10px",
                    justifyItems: "center",
                    textAlign: "center",
                    borderTop: "1px dashed rgba(192, 192, 192, 0.5)",
                    }}
                >
                    <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalProducts}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    />
                </div>
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
            dispatch(fetchAllProductStart());
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