
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Item from '../../components/Item/Item';
import ProductReviews from '../../components/ProductReviews/ProductReviews';
import BackToTop from '../../components/BackToTop/BackToTop';
// import './ProductDetails.css';
import './ProductDetails.pro.css';

const ProductDetails = () => {
    const { itemId } = useParams();
    const { itemsData, addToCart } = useContext(AppContext);
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("ProductDetails Effect Triggered");
        console.log("itemsData:", itemsData);
        console.log("itemId from params:", itemId);

        if (itemsData.length > 0) {
            // Check for both itemId and id, and handle string/number conversion
            const foundProduct = itemsData.find(item =>
                (item.itemId && item.itemId.toString() === itemId) ||
                (item.id && item.id.toString() === itemId)
            );

            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                console.warn(`Product with ID ${itemId} not found in itemsData`, itemsData);
            }
        }
    }, [itemsData, itemId]);

    if (!product) {
        // If we have items but haven't found the product yet, maybe it's still loading or doesn't exist.
        // For better UX, if itemsData is populated but product is null, it effectively means "Not Found" for this ID.
        // However, to keep it simple effectively:
        if (itemsData.length > 0) {
            return (
                <div className="product-details-container text-center pt-5 page-entry-anim">
                    <h2>Product Not Found</h2>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/explore')}>
                        Back to Explore
                    </button>
                </div>
            )
        }

        return (
            <div className="product-details-container loading page-entry-anim">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const { name, price, imgUrl, description, categoryName } = product;

    return (
        <div className="product-details-container fade-in page-entry-anim">
            <button className="btn btn-outline-secondary back-btn" onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left"></i> Back
            </button>
            <div className="product-card">
                <div className="product-image-section">
                    <img src={imgUrl} alt={name} className="product-image-large" />
                </div>
                <div className="product-info-section">
                    <h1 className="product-title">{name}</h1>
                    <div className="product-meta d-flex flex-column align-items-start gap-2">
                        <div className="d-flex align-items-center">
                            <span className="badge category-badge me-3">{categoryName || 'Category'}</span>
                            <h2 className="product-price mb-0">₹{price}</h2>
                        </div>
                        <div className="rating-container ms-0">
                            <div className="stars-wrapper me-2">
                                {[1, 2, 3, 4, 5].map((star) => {
                                    const rating = product.averageRating || 0;
                                    if (rating >= star) {
                                        return <i key={star} className="bi bi-star-fill text-warning"></i>;
                                    } else if (rating >= star - 0.5) {
                                        return <i key={star} className="bi bi-star-half text-warning"></i>;
                                    } else {
                                        return <i key={star} className="bi bi-star text-muted"></i>;
                                    }
                                })}
                            </div>
                            <span className={`rating-text ${product.averageRating > 0 ? 'fw-bold' : ''}`}>
                                {product.averageRating ? product.averageRating.toFixed(1) : '0.0'}
                            </span>
                            <span className="text-muted small ms-1">({product.totalReviews || 0} reviews)</span>
                        </div>
                    </div>

                    <div className="product-description-container">
                        <h3>Description</h3>
                        <p className="product-description">
                            {description || "No description available for this product. High quality and fresh."}
                        </p>
                    </div>

                    <div className="product-actions">
                        <button
                            className="btn btn-primary btn-lg add-to-cart-btn"
                            onClick={() => addToCart({ ...product, quantity: 1 })}
                        >
                            <i className="bi bi-cart-plus me-2"></i> Add to Cart
                        </button>
                        <button
                            className="btn btn-warning btn-lg go-to-cart-btn"
                            onClick={() => navigate('/cart')}
                        >
                            Go to Cart
                        </button>
                    </div>

                    <div className="product-features">
                        <div className="feature-item">
                            <i className="bi bi-truck"></i>
                            <span>Fast Delivery</span>
                        </div>
                        <div className="feature-item">
                            <i className="bi bi-shield-check"></i>
                            <span>Quality Guarantee</span>
                        </div>
                        <div className="feature-item">
                            <i className="bi bi-arrow-repeat"></i>
                            <span>Easy Returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Reviews Section */}
            <ProductReviews itemId={itemId} />

            {/* Similar Items Section */}
            {itemsData.filter(item => item.categoryId === product.categoryId && item.itemId !== product.itemId).length > 0 && (
                <div className="related-section similar-items-section mt-5">
                    <h3 className="section-heading">
                        <i className="bi bi-collection-fill me-3"></i>Similar Items
                    </h3>
                    <div className="items-grid-scrollable">
                        {itemsData
                            .filter(item => item.categoryId === product.categoryId && item.itemId !== product.itemId)
                            .map(item => (
                                <Item
                                    key={item.itemId}
                                    itemName={item.name}
                                    itemPrice={item.price}
                                    itemImage={item.imgUrl}
                                    itemId={item.itemId}
                                />
                            ))}
                    </div>
                </div>
            )}

            {/* Find More Section */}
            <div className="related-section find-more-section mt-5 pb-5">
                <h3 className="section-heading">
                    <i className="bi bi-search-heart-fill me-3"></i>Find More
                </h3>
                <div className="items-grid-scrollable">
                    {itemsData
                        .filter(item => item.itemId !== product.itemId) // items excluding current
                        .map(item => (
                            <Item
                                key={item.itemId}
                                itemName={item.name}
                                itemPrice={item.price}
                                itemImage={item.imgUrl}
                                itemId={item.itemId}
                            />
                        ))}
                </div>
            </div>
            <BackToTop />
        </div>
    );
};

export default ProductDetails;
