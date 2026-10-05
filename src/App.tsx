import { useState, useEffect } from 'react';
import type { Product, ProductCategory, CartItem, ProductColor, Order } from './types/shop';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { StorySection } from './components/StorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

// Seed sample past order for immediate tracking demonstration if no orders yet
const SAMPLE_INITIAL_ORDER: Order = {
  id: 'ATV-2026-1042',
  date: 'March 28, 2026',
  items: [
    {
      id: 'atv-vase-02-Chalk Matte',
      product: PRODUCTS[1],
      quantity: 1,
      selectedColor: PRODUCTS[1].colors[0]
    }
  ],
  subtotal: 165,
  discount: 0,
  shipping: 0,
  tax: 10,
  total: 175,
  status: 'quality_check',
  trackingNumber: 'EXP-88492019',
  estimatedDelivery: 'Thu, Apr 9',
  customer: {
    fullName: 'Elena Rostova',
    email: 'elena.rostova@design.org',
    phone: '+1 (555) 234-5678',
    address: '88 Franklin Street, 5th Floor',
    city: 'New York',
    postalCode: '10013',
    country: 'United States'
  },
  paymentMethod: 'card'
};

export default function App() {
  // Products
  const [products] = useState<Product[]>(PRODUCTS);

  // Category and Search Filtering
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Initial friendly item
    return [
      {
        id: `${PRODUCTS[1].id}-${PRODUCTS[1].colors[0].name}`,
        product: PRODUCTS[1],
        quantity: 1,
        selectedColor: PRODUCTS[1].colors[0]
      }
    ];
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>('WELCOME10');

  // Wishlist State (Persisted in localStorage)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // ignore
    }
    return new Set([PRODUCTS[0].id]);
  });

  // Orders State (Persisted in localStorage)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [SAMPLE_INITIAL_ORDER];
  });

  // UI Modal & Drawer States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string>('ATV-2026-1042');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast / Floating Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1, color?: ProductColor) => {
    const selectedColor = color || product.colors[0] || { name: 'Standard', hex: '#000000' };
    const cartItemId = `${product.id}-${selectedColor.name}`;

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === cartItemId);
      if (existing) {
        return prevItems.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: cartItemId,
          product,
          quantity,
          selectedColor
        }
      ];
    });

    showToast(`Added ${quantity}× "${product.name}" to your shopping bag.`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Direct checkout from quick view
  const handleDirectCheckout = (product: Product, quantity: number, color: ProductColor) => {
    handleAddToCart(product, quantity, color);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed "${product.name}" from saved pieces.`);
      } else {
        next.add(product.id);
        showToast(`Saved "${product.name}" to your wishlist.`);
      }
      return next;
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, 1, product.colors[0]);
    handleRemoveFromWishlist(product);
  };

  const handleMoveAllWishlistToCart = () => {
    const savedProducts = products.filter((p) => wishlistIds.has(p.id));
    savedProducts.forEach((p) => {
      handleAddToCart(p, 1, p.colors[0]);
    });
    setWishlistIds(new Set());
    setIsWishlistOpen(false);
    setIsCartOpen(true);
    showToast(`Moved ${savedProducts.length} pieces to your shopping bag.`);
  };

  // Order Handlers
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]); // Clear bag upon order completion
    setActiveTrackingOrderId(newOrder.id);
  };

  // Open Tracking for specific order
  const handleOpenTrackingWithOrder = (orderId: string) => {
    setActiveTrackingOrderId(orderId);
    setIsOrderLookupOpen(true);
  };

  // Computed Cart Metrics
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-stone-800 selection:text-white antialiased">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-stone-700/80 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        cartTotal={totalCartSubtotal}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToCatalog();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Editorial Campaign Hero */}
        <Hero onExploreClick={handleScrollToCatalog} />

        {/* Curated Product Grid */}
        <ProductGrid
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
        />

        {/* Story Section */}
        <StorySection />

        {/* Attributable Verified Reviews Section */}
        <ReviewsSection />
      </main>

      {/* Footnote & Concierge */}
      <Footer />

      {/* Modals & Slide-over Panels */}
      
      {/* Quick View PDP Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectCheckout={handleDirectCheckout}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedPromo={appliedPromo}
        onApplyPromo={setAppliedPromo}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveWishlistToCart}
        onMoveAllToCart={handleMoveAllWishlistToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedPromo={appliedPromo}
        onOrderCompleted={handleOrderCompleted}
        onOpenTracking={handleOpenTrackingWithOrder}
      />

      {/* Order Tracking & Lookup Modal */}
      <OrderLookupModal
        isOpen={isOrderLookupOpen}
        onClose={() => setIsOrderLookupOpen(false)}
        orders={orders}
        defaultOrderId={activeTrackingOrderId}
      />

    </div>
  );
}
