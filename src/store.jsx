
import { useState } from 'react'
import './App.css'

const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 2499, emoji: '🎧' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', price: 3999, emoji: '⌚' },
  { id: 3, name: 'Running Sneakers', category: 'Fashion', price: 1999, emoji: '👟' },
  { id: 4, name: 'Classic Backpack', category: 'Fashion', price: 1499, emoji: '🎒' },
  { id: 5, name: 'Desk Lamp', category: 'Home', price: 999, emoji: '💡' },
  { id: 6, name: 'Coffee Mug', category: 'Home', price: 399, emoji: '☕' },
]

export default function Store() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || product.category === category
    return matchesSearch && matchesCategory
  })

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id)

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#">NOVA<span>.</span></a>
        <nav>
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
        </nav>
        <div className="cart-badge">🛍️ Cart ({cartCount})</div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">THE NEW COLLECTION</p>
            <h1>Find your next<br />favorite thing.</h1>
            <p className="hero-description">
              Discover everyday essentials designed to make life better.
            </p>
            <a href="#shop" className="shop-button">Explore collection ↗</a>
          </div>
          <div className="hero-art" aria-label="Shopping collection">
            <span>🎧</span><span>👟</span><span>⌚</span>
            <div className="art-caption">GOOD FINDS. GREAT FEELINGS.</div>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED FOR YOU</p>
              <h2>Explore our collection</h2>
            </div>
            <p>{filteredProducts.length} products</p>
          </div>

          <div className="toolbar">
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search products"
            />
            <div className="filters">
              {['All', 'Electronics', 'Fashion', 'Home'].map((item) => (
                <button
                  key={item}
                  className={category === item ? 'filter active' : 'filter'}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className={`product-art product-${product.id}`}>
                  <span>{product.emoji}</span>
                  <span className="product-category">{product.category}</span>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-bottom">
                    <strong>₹{product.price.toLocaleString('en-IN')}</strong>
                    <button onClick={() => addToCart(product)}>Add +</button>
                  </div>
                </div>
              </article>
            ))}
            {filteredProducts.length === 0 && (
              <p className="empty-state">No products found. Try another search.</p>
            )}
          </div>
        </section>

        <section className="cart-section" id="about">
          <div>
            <p className="eyebrow">YOUR SELECTION</p>
            <h2>Your shopping bag</h2>
          </div>
          {cart.length === 0 ? (
            <p>Your bag is empty. Add something you love!</p>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <span>{item.emoji} {item.name} × {item.quantity}</span>
                  <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                  <button onClick={() => setCart((current) =>
                    current.filter((product) => product.id !== item.id)
                  )}>Remove</button>
                </div>
              ))}
              <h3>Total: ₹{cartTotal.toLocaleString('en-IN')}</h3>
            </div>
          )}
        </section>
      </main>

      <footer>© 2026 NOVA Store · Made for everyday living.</footer>
    </div>
  )
}

