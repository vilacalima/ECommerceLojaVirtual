function ProductRating({ rating }) {
    const stars = [];
  
    switch (rating) {
      case 0.5:
        stars.push(stars.push(<span>★</span>))
        break;
      case 1:
        stars.push(<span>⭐</span>)
        break;
      case 1.5:
        stars.push(<span>⭐★</span>)
        break;
      case 2:
        stars.push(<span>⭐⭐</span>)
        break;
      case 2.5:
        stars.push(<span>⭐⭐★</span>)
        break;
      case 3:
        stars.push(<span>⭐⭐⭐</span>)
        break;
      case 3.5:
        stars.push(<span>⭐⭐⭐★</span>)
        break;
      case 4:
        stars.push(<span>⭐⭐⭐⭐</span>)
        break;
      case 4.5:
        stars.push(<span>⭐⭐⭐⭐★</span>)
        break;
      default:
        stars.push(<span>⭐⭐⭐⭐⭐</span>)
    }
    
    return <div className="product-rating">{stars}</div>;
}

export default ProductRating;