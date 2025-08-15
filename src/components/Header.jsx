import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { MessageCircle, Leaf } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 50;
			setScrolled(isScrolled);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<Navbar
			expand="lg"
			className={`sticky-top ${
				scrolled
					? "navbar-natura-scrolled"
					: "navbar-natura-transparent"
			}`}>
			<Container>
				<Navbar.Brand
					href="/"
					className="d-flex align-items-center gap-2">
					<div
						className="bg-gradient-hero rounded-circle d-flex align-items-center justify-content-center"
						style={{ width: "32px", height: "32px" }}>
						<Leaf size={18} className="text-white" />
					</div>
					<div>
						<div className="h6 mb-0 text-natura-green fw-bold">
							ESPACIO ECOBELLEZA
						</div>
						{/* <small className="text-muted" style={{ fontSize: '0.75rem' }}>Productos NATURA</small> */}
						<div className="h6 mt-1">
							<Badge
								pill
								bg="transparent border border-2 border-success-subtle text-natura-green fw-semibold">
								Productos NATURA
							</Badge>
						</div>
					</div>
				</Navbar.Brand>

				<Nav className="ms-auto d-flex align-items-center gap-2">
					<Button
						variant="outline-success"
						onClick={() =>
							window.open("https://wa.me/5493413045300", "_blank")
						}
						className="d-none d-sm-flex align-items-center gap-2 btn-natura-outline">
						<MessageCircle size={20} />
						Contacto
					</Button>
					<CartDrawer />
				</Nav>
			</Container>
		</Navbar>
	);
};
