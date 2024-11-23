import './App.css';
import { useEffect, useState } from 'react';

interface Circles {
  id: number;
  size: number;
  x: number;
  y: number;
  gradient: string;
  directionX: number;
  directionY: number;
  speed: number;
}

function App() {
  const [circles, setCircles] = useState<Circles[]>([]);

  useEffect(() => {
    const generateCircle = (id: number): Circles => {
      const size = Math.random() * 150 + 50; // Dimensione tra 50px e 100px
      const side = Math.floor(Math.random() * 4); // 0 = sopra, 1 = sotto, 2 = sinistra, 3 = destra

      let x, y;
      if (side === 0) {
        // Sopra
        x = Math.random() * window.innerWidth;
        y = -size;
      } else if (side === 1) {
        // Sotto
        x = Math.random() * window.innerWidth;
        y = window.innerHeight + size;
      } else if (side === 2) {
        // Sinistra
        x = -size;
        y = Math.random() * window.innerHeight;
      } else {
        // Destra
        x = window.innerWidth + size;
        y = Math.random() * window.innerHeight;
      }

      const targetX = Math.random() * window.innerWidth;
      const targetY = Math.random() * window.innerHeight;

      const directionX = (targetX - x) / Math.hypot(targetX - x, targetY - y);
      const directionY = (targetY - y) / Math.hypot(targetX - x, targetY - y);

      return {
        id,
        size,
        x,
        y,
        gradient: `linear-gradient(${randomDirection()}, #05001E, #0537C1)`,
        directionX,
        directionY,
        speed: Math.random() * 1 + 0.5, // Velocità casuale
      };
    };

    const initialCircles = Array.from({ length: 10 }, (_, index) => generateCircle(index));
    setCircles(initialCircles);

    const interval = setInterval(() => {
      setCircles(prevCircles => {
        // Aggiorna la posizione dei cerchi
        return prevCircles.map(circle => {
          let newX = circle.x + circle.directionX * circle.speed;
          let newY = circle.y + circle.directionY * circle.speed;

          const isOutOfBounds =
            newX < -circle.size ||
            newX > window.innerWidth + circle.size ||
            newY < -circle.size ||
            newY > window.innerHeight + circle.size;

          if (isOutOfBounds) {
            // Rigenera un nuovo cerchio
            return generateCircle(circle.id);
          }

          return {
            ...circle,
            x: newX,
            y: newY,
          };
        });
      });
    }, 16);

    // Pulizia all'unmount
    return () => clearInterval(interval);
  }, []);

  const randomDirection = () => {
    const directions = [
      'to top',
      'to bottom',
      'to left',
      'to right',
      'to top left',
      'to top right',
      'to bottom left',
      'to bottom right',
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  return (
    <div className="App">
      <div className="container">
        
        <h1>Malavasi Manuel</h1>
        <h3>Mobile developer</h3>

      </div>

      <div className="circle-container">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="circle"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              top: `${circle.y}px`,
              left: `${circle.x}px`,
              background: circle.gradient,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;