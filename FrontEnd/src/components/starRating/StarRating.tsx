import { useState } from "react";
import './StarRating.scss';

interface StarRatingProps {
  rating?: number; // Nota inicial
  onRatingSelect?: (rating: number) => void; // Callback ao selecionar a nota
  maxRating?: number; // Número máximo de estrelas
}

/**
 * Componente de avaliação por estrelas.
 * Permite hover para pré-visualizar, clicar para selecionar e exibir visualmente a nota selecionada.
 */
function StarRating({ rating = 0, onRatingSelect, maxRating = 5 }: StarRatingProps) {
  const [hover, setHover] = useState(0); // Estado para hover
  const [selected, setSelected] = useState(rating); // Estado para nota selecionada

  /**
   * Handle click on a star
   * Atualiza o estado e chama callback do pai
   */
  function handleClick(value: number) {
    setSelected(value);
    if (onRatingSelect) {
      onRatingSelect(value);
    }
  }

  return (
    <div className="star-rating">
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={i}
            className={`star ${starValue <= (hover || selected) ? 'filled' : ''}`}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
