import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products') // Substitua pelo endpoint correto do seu servidor
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  return (
    <div className="home-page">
      <section className="carousel">
        <Carousel>
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100"
              src="https://t4.ftcdn.net/jpg/05/71/84/53/240_F_571845344_oFDuWnuzdhfUFz6OczITUQ2hHvRKmY4r.jpg"
              alt="Originaly"
            />
            <Carousel.Caption>
              <h3>Originaly</h3>
              <p>As melhores joias da América Latina</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src="https://t4.ftcdn.net/jpg/06/10/39/75/240_F_610397523_XStGOcuWQcF8i379fHewrmDUz1kJgp5T.jpg"
              alt="Image Two"
            />
            <Carousel.Caption>
              <h3>Originaly</h3>
              <p>As melhores joias da América Latina</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <header>
        <div className="logo"> Img Logo</div>
        <div className="user-section">
          <a href="#"> • 👤 Login</a>
          <a href="#"> • 🛒 Carrinho</a>
          <a href="#"> • Registrar</a>
        </div>
      </header>

      <main>
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Por: R${product.price}</p>
            <a href={`/detalhe-produto/${product.id}`} className="detail-button">
              Detalhes
            </a>
          </div>
        ))}
        {/* Adicione mais cards de produtos aqui */}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2023 Originaly. Todos os direitos reservados.</p>
          <div className="social-icons">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
