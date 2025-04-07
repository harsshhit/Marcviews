import React from 'react';
import { Trash2, ShoppingBag, CreditCard } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export function Cart() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: 1,
      name: "Enterprise Security Package",
      description: "Annual subscription for enterprise-grade security solutions",
      price: 1999.99,
      quantity: 1
    },
    {
      id: 2,
      name: "Cloud Security Assessment",
      description: "Comprehensive cloud infrastructure security assessment",
      price: 799.99,
      quantity: 1
    }
  ]);

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <ShoppingBag className="w-8 h-8 text-accent-purple mr-3" />
          <h1 className="text-3xl font-bold text-neutral-white">Your Cart</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div 
                  key={item.id}
                  className="bg-secondary-dark rounded-lg p-6 border border-primary-accent/20"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-white mb-2">{item.name}</h3>
                      <p className="text-neutral-white/70 mb-4">{item.description}</p>
                      <div className="flex items-center space-x-4">
                        <button 
                          className="text-accent-purple hover:text-accent-danger transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="text-neutral-white">{item.quantity}</span>
                        <button 
                          className="text-accent-purple hover:text-accent-teal transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xl font-semibold text-accent-teal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-accent-danger/70 hover:text-accent-danger mt-4 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-secondary-dark rounded-lg p-6 h-fit border border-primary-accent/20">
              <h2 className="text-xl font-semibold text-neutral-white mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-neutral-white/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-white/70">
                  <span>Tax (13%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-primary-accent/20 pt-4">
                  <div className="flex justify-between text-xl font-semibold text-neutral-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-accent-purple text-neutral-white py-3 rounded-lg mt-6 flex items-center justify-center space-x-2 hover:bg-accent-purple/90 transition-colors">
                  <CreditCard className="w-5 h-5" />
                  <span>Checkout</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-neutral-white/20 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-neutral-white mb-2">Your cart is empty</h2>
            <p className="text-neutral-white/70 mb-8">Add some products to your cart to continue shopping</p>
            <button className="bg-accent-purple text-neutral-white px-8 py-3 rounded-lg hover:bg-accent-purple/90 transition-colors">
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}