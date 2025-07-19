import React from 'react';
import { Container, Row, Col, Button, Badge, Card } from 'react-bootstrap';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { CartProvider } from '@/context/CartContext';
import { useProducts } from '@/hooks/useProducts';
import { Star, Truck, Shield, Leaf, MessageCircle, Heart, ShoppingCart } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const Index = () => {
  const { products, loading, error } = useProducts();

  const scrollToProducts = () => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
		<CartProvider>
			<div className="min-vh-100">
				<Toaster position="top-right" />
				<Header />

				{/* Hero Section */}
				<section className="hero-section d-flex align-items-center justify-content-center text-white">
					<div className="hero-overlay"></div>
					<Container className="position-relative text-center">
						<Badge className="mb-3 bg-white text-natura-green border-0 px-3 py-2 fw-bold">
							<Leaf size={16} className="me-2" />
							Belleza Sustentable
						</Badge>
						<h1 className="display-1 fw-bold mb-4 animate-fade-in">
							ESPACIO ECOBELLEZA
						</h1>
						<p className="fs-4 mb-4 animate-fade-in">
							Descubre la belleza natural con productos NATURA
							<br />
							Cuidado consciente para ti y el planeta
						</p>
						<div className="d-flex flex-column flex-sm-row gap-3 justify-content-center animate-scale-in">
							<Button
								onClick={scrollToProducts}
								size="lg"
								className="btn-natura-primary">
								Explorar Productos
							</Button>
							<Button
								variant="outline-light"
								size="lg"
								onClick={() =>
									window.open(
										"https://wa.me/5493413045300",
										"_blank"
									)
								}>
								<MessageCircle size={20} className="me-2" />
								Consultar
							</Button>
						</div>
					</Container>
				</section>

				{/* Features */}
				<section className="py-5 bg-natura-cream">
					<Container>
						<Row>
							{[
								{
									icon: Truck,
									title: "Envío Rápido",
									desc: "Entregas en toda la zona con cuidado especial",
								},
								{
									icon: Shield,
									title: "Calidad Garantizada",
									desc: "Productos originales directos de NATURA",
								},
								{
									icon: Leaf,
									title: "100% Natural",
									desc: "Comprometidos con la sustentabilidad",
								},
							].map((feature, idx) => (
								<Col
									md={4}
									key={idx}
									className="text-center mb-4">
									<div
										className="bg-gradient-hero rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 animate-float"
										style={{
											width: "64px",
											height: "64px",
										}}>
										<feature.icon
											size={32}
											className="text-white"
										/>
									</div>
									<h5>{feature.title}</h5>
									<p className="text-muted">{feature.desc}</p>
								</Col>
							))}
						</Row>
					</Container>
				</section>

				{/* Products */}
				<section id="productos" className="py-5">
					<Container>
						<div className="text-center mb-5">
							<Badge className="mb-3 bg-natura-green-light text-natura-green fs-1">
								Productos Destacados
							</Badge>
							{/* <h2 className="display-4 fw-bold mb-3">
								Nuestros Productos
							</h2> */}
							<p className="fs-5 text-muted">
								Descubre nuestra selección de productos NATURA
								para cuidar tu belleza
							</p>
						</div>

						{loading && (
							<div className="text-center">
								<div className="spinner-natura mx-auto"></div>
								<p className="mt-3">Cargando productos...</p>
							</div>
						)}

						{error && (
							<div className="alert alert-warning text-center">
								{error}
							</div>
						)}

						<Row>
							{products.map((product, index) => (
								<Col
									lg={4}
									md={6}
									key={product.id}
									className="mb-4">
									<ProductCard product={product} />
								</Col>
							))}
						</Row>
					</Container>
				</section>

				{/* Testimonios */}
				<section className="py-5 bg-natura-cream">
					<Container>
						<div className="text-center mb-5">
							<Badge className="mb-3 bg-natura-green-light text-natura-green">
								Testimonios
							</Badge>
							<h2 className="display-4 fw-bold mb-3">
								Lo que dicen nuestras clientas
							</h2>
							<p className="fs-5 text-muted">
								Descubre las experiencias reales de quienes ya
								transformaron su rutina de belleza
							</p>
						</div>

						<Row>
							{[
								{
									name: "María González",
									location: "Rosario",
									text: "Los productos NATURA transformaron mi piel completamente. La crema Ekos es increíble, mi piel nunca se sintió tan suave e hidratada.",
									rating: 5,
								},
								{
									name: "Ana Rodríguez",
									location: "Santa Fe",
									text: "Excelente atención y productos de calidad. El perfume Kaiak es mi favorito, tiene una fragancia única que dura todo el día.",
									rating: 5,
								},
								{
									name: "Carolina López",
									location: "Funes",
									text: "La paleta de maquillaje Una es perfecta para mi día a día. Los colores son naturales y la duración es excelente. Super recomendable!",
									rating: 5,
								},
							].map((testimonial, idx) => (
								<Col md={4} key={idx} className="mb-4">
									<Card className="h-100 border-0 shadow-card-natura animate-fade-in">
										<Card.Body className="text-center p-4">
											<div className="mb-3">
												{[
													...Array(
														testimonial.rating
													),
												].map((_, i) => (
													<Star
														key={i}
														size={20}
														className="text-warning me-1"
														fill="currentColor"
													/>
												))}
											</div>
											<Card.Text className="mb-4 fst-italic">
												"{testimonial.text}"
											</Card.Text>
											<div className="d-flex align-items-center justify-content-center gap-3">
												<div
													className="bg-gradient-hero rounded-circle d-flex align-items-center justify-content-center"
													style={{
														width: "50px",
														height: "50px",
													}}>
													<Heart
														size={24}
														className="text-white"
													/>
												</div>
												<div className="text-start">
													<h6 className="mb-0 text-natura-green">
														{testimonial.name}
													</h6>
													<small className="text-muted">
														{testimonial.location}
													</small>
												</div>
											</div>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					</Container>
				</section>

				{/* Llamada a la acción */}
				<section className="py-5 bg-gradient-hero text-white">
					<Container className="text-center">
						<Row className="justify-content-center">
							<Col lg={8}>
								<h2 className="display-4 fw-bold mb-4 animate-fade-in">
									¿Lista para tu transformación natural?
								</h2>
								<p className="fs-5 mb-5 opacity-90 animate-fade-in">
									Únete a miles de mujeres que ya eligieron
									NATURA para realzar su belleza natural.
									Descubre productos únicos que cuidan de ti y
									del planeta.
								</p>
								<div className="d-flex flex-column flex-sm-row gap-3 justify-content-center animate-scale-in">
									<Button
										size="lg"
										className="btn-natura-primary text-dark fw-bold px-5"
										onClick={() =>
											document
												.getElementById("productos")
												?.scrollIntoView({
													behavior: "smooth",
												})
										}>
										<ShoppingCart
											size={20}
											className="me-2"
										/>
										Comprar Ahora
									</Button>
									<Button
										variant="outline-light"
										size="lg"
										className="fw-bold px-5"
										onClick={() =>
											window.open(
												"https://wa.me/5493413045300",
												"_blank"
											)
										}>
										<MessageCircle
											size={20}
											className="me-2"
										/>
										Consultar por WhatsApp
									</Button>
								</div>
							</Col>
						</Row>
					</Container>
				</section>

				{/* Footer */}
				<footer className="footer-natura py-5">
					<Container>
						<Row>
							<Col md={4} className="mb-4">
								<div className="d-flex align-items-center gap-2 mb-3">
									<Leaf size={24} />
									<h5 className="mb-0">ESPACIO ECOBELLEZA</h5>
								</div>
								<p className="opacity-75 mb-3">
									Tu consultora de productos NATURA. Belleza
									natural y sustentable.
								</p>
								<Button
									variant="outline-light"
									size="sm"
									onClick={() =>
										window.open(
											"https://wa.me/5493413045300",
											"_blank"
										)
									}>
									<MessageCircle size={16} className="me-2" />
									WhatsApp: +54 9 341 304-5300
								</Button>
							</Col>
							<Col md={4} className="mb-4">
								<h6>Categorías</h6>
								<ul className="list-unstyled opacity-75">
									<li>Cuidado Facial</li>
									<li>Maquillaje</li>
									<li>Perfumes</li>
									<li>Cuidado Corporal</li>
								</ul>
							</Col>
							<Col md={4} className="mb-4">
								<h6>Contacto</h6>
								<div className="opacity-75">
									<p>📱 +54 9 341 304-5300</p>
									<p>🌍 Envíos a toda la zona</p>
									<p>⭐ Consultora oficial NATURA</p>
								</div>
							</Col>
						</Row>
						<hr className="opacity-25" />
						<div className="text-center opacity-50">
							<p>
								&copy; 2025 ESPACIO ECOBELLEZA - Consultora
								Oficial NATURA - Todos los derechos reservados
							</p>
						</div>
					</Container>
				</footer>
			</div>
		</CartProvider>
  );
};

export default Index;