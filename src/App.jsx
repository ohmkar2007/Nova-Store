
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';
import './App.css';

const products = [
  {
    id: '1',
    name: 'Studio Headphones',
    category: 'Audio',
    price: 2499,
    oldPrice: 3299,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85',
    description:
      'Immerse yourself in rich, detailed sound with comfortable ear cushions and a clean, everyday design.',
    tag: 'BESTSELLER',
    color: 'Sand',
  },
  {
    id: '2',
    name: 'Everyday Sneakers',
    category: 'Style',
    price: 3199,
    oldPrice: 3999,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85',
    description:
      'A versatile sneaker with a bold silhouette, cushioned comfort and an easy everyday fit.',
    tag: 'POPULAR',
    color: 'Crimson',
  },
  {
    id: '3',
    name: 'Minimal Watch',
    category: 'Accessories',
    price: 1899,
    oldPrice: null,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
    description:
      'A timeless, minimalist watch designed to complement your daily essentials without overdoing it.',
    tag: 'NEW ARRIVAL',
    color: 'Silver',
  },
  {
    id: '4',
    name: 'Everyday Backpack',
    category: 'Lifestyle',
    price: 1599,
    oldPrice: 1999,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
    description:
      'Carry your daily essentials in a practical backpack with a streamlined shape and useful storage.',
    tag: '',
    color: 'Olive',
  },
  {
    id: '5',
    name: 'Classic Sunglasses',
    category: 'Accessories',
    price: 999,
    oldPrice: null,
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
    description:
      'A clean, easy-to-style pair of sunglasses that brings a finishing touch to everyday outfits.',
    tag: '',
    color: 'Black',
  },
  {
    id: '6',
    name: 'Wireless Speaker',
    category: 'Audio',
    price: 2199,
    oldPrice: 2699,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=85',
    description:
      'Bring your favourite playlists along with a compact speaker made for music at home or on the go.',
    tag: 'TRENDING',
    color: 'Charcoal',
  },
];

const money = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

function Header({ cartCount }) {
  return (
    <header className="navbar">
      <Link className="brand" to="/">
        nova<span>.</span>
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link className="cart-link" to="/cart">
          Bag <span className="cart-count">{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-image-link"
        aria-label={`View ${product.name}`}
      >
        <div className="product-image">
          {product.tag && <span className="product-tag">{product.tag}</span>}
          <img src={product.image} alt={product.name} loading="lazy" />
          <span className="view-product">View product ↗</span>
        </div>
      </Link>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>

        <div className="product-bottom">
          <div className="price-group">
            <strong>{money(product.price)}</strong>
            {product.oldPrice && (
              <del>{money(product.oldPrice)}</del>
            )}
          </div>

          <button
            className="quick-add"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to bag`}
            title="Add to bag"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

function ShopSection({ addToCart, showHeading = true }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === 'All' || product.category === category;
    const matchesSearch =
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="shop-section" id="collection">
      {showHeading && (
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE NOVA EDIT</span>
            <h2>Good things. Great design.</h2>
          </div>
          <span className="item-count">{filteredProducts.length} products</span>
        </div>
      )}

      <div className="toolbar">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search the collection..."
            aria-label="Search products"
          />
        </label>

        <div className="filters" aria-label="Filter products by category">
          {categories.map((item) => (
            <button
              key={item}
              className={`filter ${category === item ? 'active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-results">
          <span>⌕</span>
          <h3>No matches found</h3>
          <p>Try another search or choose a different category.</p>
          <button
            className="secondary-button"
            onClick={() => {
              setSearch('');
              setCategory('All');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}

function Home({ addToCart }) {
  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="hero-label">
              <span className="status-dot" /> THE EVERYDAY COLLECTION
            </span>
            <h1>
              Less noise.
              <br />
              <span>More you.</span>
            </h1>
            <p>
              Thoughtful essentials. Clean design. Everyday things,
              made a little more special.
            </p>
            <Link className="primary-button" to="/shop">
              Explore the collection <span>↗</span>
            </Link>
            <div className="hero-footnote">
              <span>01 / 06</span>
              <span>CURATED FOR EVERYDAY</span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src={products[0].image}
              alt="NOVA Studio Headphones"
              fetchPriority="high"
            />
            <div className="floating-note">
              <span>01 — EDITOR'S PICK</span>
              <strong>Studio Headphones</strong>
              <span>{money(products[0].price)}</span>
            </div>
            <div className="hero-index">N° 001</div>
          </div>
        </section>

        <div className="benefits-strip">
          <span>✳ Curated essentials</span>
          <span>✳ Clean, considered design</span>
          <span>✳ Made for everyday</span>
        </div>

        <ShopSection addToCart={addToCart} />
      </main>
    </>
  );
}

function Shop({ addToCart }) {
  return (
    <main className="page-wrap">
      <div className="page-intro">
        <span className="eyebrow">FIND YOUR EVERYDAY</span>
        <h1>The collection<span>.</span></h1>
        <p>Useful things, thoughtfully picked.</p>
      </div>
      <ShopSection addToCart={addToCart} showHeading={false} />
    </main>
  );
}

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main className="page-wrap not-found">
        <h1>Product not found.</h1>
        <Link className="primary-button" to="/shop">Back to shop</Link>
      </main>
    );
  }

  return (
    <main className="page-wrap detail-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link><span>/</span>
        <Link to="/shop">Shop</Link><span>/</span>
        <span>{product.name}</span>
      </div>

      <section className="details">
        <div className="details-gallery">
          <div className="details-main-image">
            {product.tag && <span className="product-tag">{product.tag}</span>}
            <img src={product.image} alt={product.name} />
            <span className="image-index">NOVA / {product.id.padStart(2, '0')}</span>
          </div>
          <div className="gallery-caption">
            <span>DESIGNED FOR EVERYDAY</span>
            <span>01 / 01</span>
          </div>
        </div>

        <div className="details-info">
          <span className="eyebrow">{product.category.toUpperCase()} — NOVA EDIT</span>
          <h1>{product.name}<span>.</span></h1>

          <div className="details-price">
            <strong>{money(product.price)}</strong>
            {product.oldPrice && <del>{money(product.oldPrice)}</del>}
            {product.oldPrice && (
              <span className="save-label">
                SAVE {Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          <p className="details-description">{product.description}</p>

          <div className="product-spec">
            <span>COLOUR</span>
            <strong>{product.color}</strong>
          </div>
          <div className="product-spec">
            <span>COLLECTION</span>
            <strong>NOVA Everyday</strong>
          </div>

          <button
            className="primary-button add-to-bag"
            onClick={() => addToCart(product)}
          >
            Add to bag <span>↗</span>
          </button>

          <div className="detail-assurance">
            <span>✓ Carefully selected essentials</span>
            <span>✓ Simple, transparent pricing</span>
          </div>

          <button className="back-link" onClick={() => navigate(-1)}>
            ← Back to browsing
          </button>
        </div>
      </section>

      <section className="product-story">
        <span className="eyebrow">THE NOVA STANDARD</span>
        <h2>Good design should feel effortless.</h2>
        <p>
          We believe everyday essentials should be practical, thoughtfully
          designed and easy to make your own. That's the idea behind NOVA.
        </p>
      </section>

      <section className="related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">KEEP EXPLORING</span>
            <h2>You might also like.</h2>
          </div>
          <Link className="text-link" to="/shop">View all ↗</Link>
        </div>
        <div className="product-grid">
          {products
            .filter((item) => item.id !== product.id)
            .slice(0, 3)
            .map((item) => (
              <ProductCard key={item.id} product={item} addToCart={addToCart} />
            ))}
        </div>
      </section>
    </main>
  );
}

function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="quantity" aria-label="Change quantity">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

function Cart({ cart, changeQuantity, removeFromCart, clearCart }) {
  const navigate = useNavigate();
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  function checkout() {
    alert('Thanks for trying NOVA Store! This is a demo checkout; no payment was taken.');
  }

  return (
    <main className="page-wrap cart-page">
      <div className="page-intro">
        <span className="eyebrow">YOUR SELECTED ESSENTIALS</span>
        <h1>Your bag<span>.</span></h1>
        <p>{totalItems} {totalItems === 1 ? 'item' : 'items'} in your bag</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">↗</div>
          <h2>Your bag is taking a break.</h2>
          <p>Find something useful, something lovely, something you.</p>
          <button className="primary-button" onClick={() => navigate('/shop')}>
            Explore the collection <span>↗</span>
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            <div className="cart-list-heading">
              <span>PRODUCT</span>
              <span>QUANTITY</span>
              <span>SUBTOTAL</span>
            </div>

            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link to={`/product/${item.id}`} className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="cart-product">
                  <span className="product-category">{item.category}</span>
                  <Link to={`/product/${item.id}`} className="cart-product-name">
                    {item.name}
                  </Link>
                  <span className="cart-unit-price">{money(item.price)} each</span>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <QuantityControl
                  quantity={item.quantity}
                  onDecrease={() => changeQuantity(item.id, -1)}
                  onIncrease={() => changeQuantity(item.id, 1)}
                />

                <strong className="cart-subtotal">
                  {money(item.price * item.quantity)}
                </strong>
              </article>
            ))}

            <div className="cart-actions">
              <Link to="/shop" className="text-link">← Continue shopping</Link>
              <button className="remove-button" onClick={clearCart}>
                Clear bag
              </button>
            </div>
          </section>

          <aside className="order-summary">
            <span className="eyebrow">THE TOTAL</span>
            <h2>Order summary</h2>
            <div className="summary-line">
              <span>Subtotal</span><strong>{money(total)}</strong>
            </div>
            <div className="summary-line">
              <span>Shipping</span><strong className="free-shipping">FREE</strong>
            </div>
            <div className="summary-total">
              <span>Total</span><strong>{money(total)}</strong>
            </div>
            <p className="demo-note">Demo store · No payment will be processed.</p>
            <button className="primary-button checkout-button" onClick={checkout}>
              Continue to checkout <span>↗</span>
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}

function NotFound() {
  return (
    <main className="page-wrap not-found">
      <span className="eyebrow">404 — WRONG TURN</span>
      <h1>This page wandered off<span>.</span></h1>
      <Link className="primary-button" to="/">Back to home</Link>
    </main>
  );
}

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('nova-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('nova-cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        )
    );
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter basename="/Nova-Store">
      <div className="app-shell">
        <Header cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route
            path="/product/:id"
            element={<ProductDetails addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                changeQuantity={changeQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer className="site-footer">
          <Link className="brand" to="/">nova<span>.</span></Link>
          <p>Everyday essentials. Thoughtfully selected.</p>
          <span>© 2026 NOVA STORE · STUDENT PROJECT</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}
