import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Star } from "lucide-react";

export const ProductCard = ({ product }) => {
	return (
		<Card className="h-100 shadow-sm">
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

			<Card.Body>
				<Card.Title>{product.name}</Card.Title>
				<Card.Text>{product.description}</Card.Text>
				<Card.Text className="fw-bold">${product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};
