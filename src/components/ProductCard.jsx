import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const ProductCard = ({ product }) => {
	const { addToCart } = useCart();

	const handleAddToCart = () => {
		addToCart(product);
	};

	return (
		<Card className="product-card h-100 shadow-sm animate-fade-in">
			<div className="position-relative overflow-hidden">
				{/* Imagen */}
				<Card.Img
					variant="top"
					src={product.image}
					alt={product.name}
					style={{ height: "250px", objectFit: "cover" }}
				/>

				{/* Categoría */}
				<Badge
					bg="success"
					className="position-absolute top-0 start-0 m-2 bg-natura-green">
					{product.category}
				</Badge>

				{/* Rating de ejemplo */}
				<div className="position-absolute top-0 end-0 m-2 bg-white bg-opacity-90 rounded-pill px-2 py-1 d-flex align-items-center gap-1">
					<Star
						size={12}
						className="text-warning"
						fill="currentColor"
					/>
					<small className="fw-medium">4.8</small>
				</div>
			</div>

			<Card.Body className="d-flex flex-column">
				<Card.Title className="text-natura-green h5 mb-2">
					{product.name}
				</Card.Title>
				<Card.Text className="text-muted flex-grow-1 small">
					{product.description}
				</Card.Text>

				<div className="d-flex justify-content-between align-items-center mt-auto">
					<div className="h4 mb-0 text-natura-green fw-bold">
						${product.price.toLocaleString()}
					</div>
					<Button
						onClick={handleAddToCart}
						className="btn-natura-primary d-flex align-items-center gap-2"
						size="sm">
						<ShoppingCart size={16} />
						Agregar
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
};
