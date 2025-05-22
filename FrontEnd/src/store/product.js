import { create } from 'zustand'

export const useProductStore = create((set) => ({
  products: [],
  cart: [],
  wishlist: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),

  //Fetch Product
  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to fetch products')
      set({ products: data.data || [], loading: false })
    } catch (error) {
      set({ loading: false, error: error.message })
    }
  },

  //Create Product
  createProduct: async (newProduct) => {
    set({ loading: true, error: null })
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.colors?.every((color) => color.name) ||
      !newProduct.sizes?.every((size) => size.name)
    ) {
      set({ loading: false })
      return { success: false, message: 'Please fill in all fields.' }
    }
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Product creation failed')
      set((state) => ({
        products: [...state.products, data.data],
        loading: false,
      }))
      return { success: true, message: 'Product created successfully' }
    } catch (error) {
      set({ loading: false, error: error.message })
      return { success: false, message: error.message }
    }
  },

  //Delete Product
  deleteProduct: async (pid) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/products/${pid}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Product deletion failed')
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
        loading: false,
      }))
      return { success: true, message: data.message }
    } catch (error) {
      set({ loading: false, error: error.message })
      return { success: false, message: error.message }
    }
  },

  //Update Product
  updateProduct: async (pid, updatedProduct) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Product update failed')
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
        loading: false,
      }))
      return { success: true, message: data.message }
    } catch (error) {
      set({ loading: false, error: error.message })
      return { success: false, message: error.message }
    }
  },

  //Add to Cart
  // addToCart: async (pid) => {
  //   set({ loading: true, error: null });

  //   try {
  //     const { products, cart } = get(); // Access the current state
  //     const product = products.find((p) => p.id === pid);

  //     if (!product) {
  //       throw new Error("Product not found");
  //     }

  //     const isAlreadyInCart = cart.some((item) => item.id === pid);
  //     if (isAlreadyInCart) {
  //       throw new Error("Product is already in the cart");
  //     }

  //     set({
  //       cart: [...cart, product], // Add the product to the cart
  //       loading: false,
  //     });

  //     return { success: true, message: "Item added to cart" };
  //   } catch (error) {
  //     set({ loading: false, error: error.message });
  //     return { success: false, message: error.message || "Failed to add item to cart" };
  //   }
  // },

  // //Add to Wishlist
  // addToWishList: async (pid) => {
  //   set({ loading: true, error: null });

  //   try {
  //     const { products, wishlist } = get(); // Access the current state
  //     const product = products.find((p) => p.id === pid);
  //     if (!product) {
  //       throw new Error("Product not found");
  //     }

  //     const isAlreadyInWishlist = wishlist.some((item) => item.id === pid);
  //     if (isAlreadyInWishlist) {
  //       throw new Error("Product is already in the wishlist");
  //     }

  //     set({
  //       wishlist: [...wishlist, product], // Add the product to the wishlist
  //       loading: false,
  //     });

  //     return { success: true, message: "Item added to wishlist" };
  //   } catch (error) {
  //     set({ loading: false, error: error.message });
  //     return { success: false, message: error.message || "Failed to add item to wishlist" };
  //   }
  // },
}))
