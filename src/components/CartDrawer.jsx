import React, { useState } from "react";
import { Offcanvas, Button, Badge, ListGroup, Modal } from "react-bootstrap";
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer = () => {
	const {
		items,
		isOpen,
		openCart,
		closeCart,
		updateQuantity,
		removeFromCart,
		clearCart,
		getTotalItems,
		getTotalPrice,
	} = useCart();

	const [showConfirmationModal, setShowConfirmationModal] = useState(false);


	const handleWhatsAppOrder = () => {
		if (items.length === 0) return;

		const orderDetails = items
			.map(
				(item, index) =>
					`${index + 1}. *${item.name}*\n` +
					`   📦 Cantidad: ${item.quantity}\n` +
					`   💰 Precio unitario: $${item.price.toLocaleString()}\n` +
					`   💵 Subtotal: $${(
						item.price * item.quantity
					).toLocaleString()}`
			)
			.join("\n\n");

		const total = getTotalPrice();
		const totalItems = getTotalItems();

		const message = `🌿 *PEDIDO - ESPACIO ECOBELLEZA* 🌿

¡Hola! Me interesa realizar el siguiente pedido:

📋 *DETALLE DEL PEDIDO:*
${orderDetails}

📊 *RESUMEN:*
• Total de productos: ${totalItems} unidad${totalItems !== 1 ? "es" : ""}
• *TOTAL A PAGAR: $${total.toLocaleString()}*

🚚 Por favor, confirmame disponibilidad y costos de envío.

¡Gracias! 💚`;

		// Detectar el entorno
		const isDesktop =
			window.innerWidth > 768 && !("ontouchstart" in window);
		const isMobile =
			/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			);

		let whatsappUrl;

		if (isMobile || !isDesktop) {
			// Dispositivo móvil o táctil
			whatsappUrl = `https://wa.me/5493413045300?text=${encodeURIComponent(
				message
			)}`;
		} else {
			// Desktop/navegador
			whatsappUrl = `https://web.whatsapp.com/send/?phone=5493413045300&text=${encodeURIComponent(
				message
			)}&type=phone_number&app_absent=0`;
		}

		window.open(whatsappUrl, "_blank");

		// 🔹 Cerrar el Offcanvas
		closeCart();

		// Mostrar el modal
		setShowConfirmationModal(true);
	};

	return (
		<>
			<Button
				variant="outline-success"
				className="position-relative btn-natura-outline"
				onClick={openCart}>
				<ShoppingCart size={20} />
				{getTotalItems() > 0 && (
					<Badge
						bg="danger"
						className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
						{getTotalItems()}
					</Badge>
				)}
			</Button>

			<Offcanvas show={isOpen} onHide={closeCart} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title className="text-natura-green fw-bold">
						<ShoppingCart size={24} className="me-2" />
						Tu Carrito ({getTotalItems()})
					</Offcanvas.Title>
				</Offcanvas.Header>

				<Offcanvas.Body className="d-flex flex-column">
					{items.length === 0 ? (
						<div className="text-center py-5">
							<ShoppingCart
								size={64}
								className="text-muted mb-3"
							/>
							<p className="text-muted">Tu carrito está vacío</p>
							<Button
								onClick={closeCart}
								className="btn-natura-primary">
								Explorar Productos
							</Button>
						</div>
					) : (
						<>
							<ListGroup variant="flush" className="flex-grow-1">
								{items.map((item) => (
									<ListGroup.Item
										key={item.id}
										className="border-0 px-0">
										<div className="d-flex align-items-center gap-3">
											<img
												src={item.image}
												alt={item.name}
												className="rounded"
												style={{
													width: "60px",
													height: "60px",
													objectFit: "cover",
												}}
											/>

											<div className="flex-grow-1">
												<h6 className="mb-1 text-natura-green">
													{item.name}
												</h6>
												<p className="mb-1 text-muted small">
													$
													{item.price.toLocaleString()}{" "}
													c/u
												</p>

												<div className="d-flex align-items-center gap-2">
													<Button
														size="sm"
														variant="outline-secondary"
														onClick={() =>
															updateQuantity(
																item.id,
																item.quantity -
																	1
															)
														}
														className="border-0 p-1"
														style={{
															width: "30px",
															height: "30px",
														}}>
														<Minus size={14} />
													</Button>

													<span className="fw-medium mx-2">
														{item.quantity}
													</span>

													<Button
														size="sm"
														variant="outline-secondary"
														onClick={() =>
															updateQuantity(
																item.id,
																item.quantity +
																	1
															)
														}
														className="border-0 p-1"
														style={{
															width: "30px",
															height: "30px",
														}}>
														<Plus size={14} />
													</Button>

													<Button
														size="sm"
														variant="outline-danger"
														onClick={() =>
															removeFromCart(
																item.id
															)
														}
														className="border-0 p-1 ms-2"
														style={{
															width: "30px",
															height: "30px",
														}}>
														<Trash2 size={14} />
													</Button>
												</div>
											</div>

											<div className="text-end">
												<div className="h6 mb-0 text-natura-green fw-bold">
													$
													{(
														item.price *
														item.quantity
													).toLocaleString()}
												</div>
											</div>
										</div>
									</ListGroup.Item>
								))}
							</ListGroup>

							<div className="border-top pt-3 mt-3">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<h5 className="mb-0">Total:</h5>
									<h4 className="mb-0 text-natura-green fw-bold">
										${getTotalPrice().toLocaleString()}
									</h4>
								</div>

								<div className="d-grid gap-2">
									<Button
										onClick={handleWhatsAppOrder}
										className="btn-natura-primary"
										size="lg">
										<MessageCircle
											size={20}
											className="me-2"
										/>
										Pedir por WhatsApp
									</Button>

									<Button
										variant="outline-secondary"
										onClick={clearCart}
										size="sm">
										Vaciar Carrito
									</Button>
								</div>
							</div>
						</>
					)}
				</Offcanvas.Body>
			</Offcanvas>
			<Modal
				show={showConfirmationModal}
				onHide={() => {
					setShowConfirmationModal(false);
					clearCart(); // ✅ Vaciar carrito al cerrar modal
				}}
				centered>
				<Modal.Header closeButton>
					<Modal.Title className="text-natura-green fw-bold">
						📦 Pedido Enviado
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					<p className="mb-3">
						✅ Tu pedido fue enviado por WhatsApp. <br />
						¡Gracias por tu compra! 💚
					</p>
					<Button
						variant="success"
						className="btn-natura-primary"
						onClick={() => {
							setShowConfirmationModal(false);
							clearCart(); // ✅ También vacía si se cierra desde botón
						}}>
						Cerrar
					</Button>
				</Modal.Body>
			</Modal>
		</>
	);
};
