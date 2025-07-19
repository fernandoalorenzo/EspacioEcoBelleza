import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col className="text-center">
          <div className="mb-4">
            <div className="bg-gradient-hero rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                 style={{ width: '80px', height: '80px' }}>
              <Home size={40} className="text-white" />
            </div>
          </div>
          <h1 className="display-4 fw-bold text-natura-green mb-3">404</h1>
          <h2 className="h4 mb-3">Página no encontrada</h2>
          <p className="text-muted mb-4">
            Lo sentimos, la página que buscas no existe.
          </p>
          <Button 
            href="/" 
            className="btn-natura-primary"
            size="lg"
          >
            <ArrowLeft size={20} className="me-2" />
            Volver al inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;