// import './DisplayItems.css';
import './DisplayItems.pro.css';
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import Item from "../Item/Item.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";

const DisplayItems = ({ selectedCategory }) => {
    const { itemsData, dataLoading } = useContext(AppContext);
    const [showAllItems, setShowAllItems] = useState(false);
    const [searchText, setSearchText] = useState("");

    const filteredItems = itemsData.filter(item => {
        if (!selectedCategory) return true;
        return item.categoryId === selectedCategory;
    }).filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

    const displayedItems = showAllItems ? filteredItems : filteredItems.slice(0, 12);

    return (
        <>
            <div className="search-divider"></div>
            <SearchBox searchText={searchText} setSearchText={setSearchText} />
            <h3 className="section-title">
                <i className="bi bi-bag-check me-2"></i> Premium Items
            </h3>
            <div className="items-grid">
                {dataLoading ? (
                    <div className="col-12 text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    filteredItems.length === 0 ? (
                        <div className="empty-explore-state text-center py-5 w-100">
                            <i className="bi bi-search mb-4" style={{ fontSize: '3.5rem', display: 'block', opacity: 0.15 }}></i>
                            <h4 className="text-muted">Oops! No items found</h4>
                            <p className="text-secondary">Try adjusting your search or select a different category.</p>
                        </div>
                    ) : (
                        <>
                            {displayedItems.map(item => (
                                <Item
                                    key={item.itemId}
                                    itemName={item.name}
                                    itemPrice={item.price}
                                    itemImage={item.imgUrl}
                                    itemId={item.itemId}
                                />
                            ))}
                        </>
                    )
                )}
            </div>
            {!dataLoading && filteredItems.length > 12 && (
                <>
                    {!showAllItems ? (
                        <div className="text-center mt-5 mb-4">
                            <button className="see-more-reviews-btn" onClick={() => setShowAllItems(true)}>
                                See More Products <i className="bi bi-chevron-down ms-2"></i>
                            </button>
                        </div>
                    ) : (
                        <div className="text-center mt-5 mb-4">
                            <button className="see-more-reviews-btn show-less" onClick={() => setShowAllItems(false)}>
                                Show Less <i className="bi bi-chevron-up ms-2"></i>
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default DisplayItems;
