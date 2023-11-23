import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../compra/pagamento.css';

function BoxResponse(props) {
  const { itens } = props;
  
  return (
    <div className='borda'>
      <div>
        <p className='meus-pedidos-tag-p'> {itens}</p>    
      </div>
    </div>
  );
  
}

export default BoxResponse;
