// cartController.js

import Cart from '../models/cart.model.js'

const cartController = {
    addToCart: async (req, res) => {
        try {
            const userId = req.session.user._id;
            const productId = req.params.productId;

            // Buscar el carrito del usuario en la base de datos
            let cart = await Cart.findOne({ userId });

            // Si el usuario no tiene un carrito, crear uno nuevo
            if (!cart) {
                cart = new Cart({ userId, products: [] });
            }

            // Verificar si el producto ya está en el carrito
            const existingProductIndex = cart.products.findIndex(product => String(product.productId) === String(productId));

            // Si el producto ya está en el carrito, incrementar la cantidad
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity++;
            } else {
                // Si el producto no está en el carrito, agregarlo
                cart.products.push({ productId, quantity: 1 });
            }

            // Guardar el carrito actualizado en la base de datos
            await cart.save();

            res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
        // Método para vaciar el carrito
        clearCart: async (req, res) => {
            try {
                const userId = req.session.user._id;

                // Buscar el carrito del usuario en la base de datos
                const cart = await Cart.findOne({ userId });

                // Si el carrito existe, eliminar todos los productos
                if (cart) {
                    cart.products = [];
                    await cart.save();
                    res.status(200).json({ message: 'Carrito vaciado exitosamente' });
                } else {
                    // Si el carrito no existe, devolver un mensaje indicando que no hay productos en el carrito
                    res.status(404).json({ message: 'El carrito está vacío' });
                }
            } catch (error) {
                console.error('Error al vaciar el carrito:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }
};

export default cartController;
