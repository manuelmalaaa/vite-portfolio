import "./App.css";
import { useEffect, useState } from "react";
import "./styles/colors.css";
import { useIntersection } from "@mantine/hooks";

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
  const { ref, entry } = useIntersection();

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
        gradient: `linear-gradient(${randomDirection()}, var(--purple700), var(--purple600))`,
        directionX,
        directionY,
        speed: Math.random() * 1 + 0.5,
      };
    };

    const initialCircles = Array.from({ length: 10 }, (_, index) =>
      generateCircle(index)
    );
    setCircles(initialCircles);

    const interval = setInterval(() => {
      setCircles((prevCircles) => {
        // Aggiorna la posizione dei cerchi
        return prevCircles.map((circle) => {
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

    return () => clearInterval(interval);
  }, []);

  const randomDirection = () => {
    const directions = [
      "to top",
      "to bottom",
      "to left",
      "to right",
      "to top left",
      "to top right",
      "to bottom left",
      "to bottom right",
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  return (
    <div className="App">
      {entry?.isIntersecting && (
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
      )}

      <div className="start-view">
        <h1 ref={ref}>MALAVASI MANUEL</h1>
        <h3>"Know your limits, but never stop trying to overcome them."</h3>
      </div>

      <div className="second-view">
        <h1>Chi sono ?</h1>
        <h3 style={{ width: "55%", marginTop: 60 }}>
          Sono un Mobile developer con una grande passione per iOS e una solida
          esperienza nell'uso di Swift, SwiftUI e UIKit. Mi occupo anche dello
          sviluppo per Android, utilizzando Kotlin, Jetpack Compose e XML. Il
          cross-platform mi aﬀascina molto, e mi sto impegnando a fondo con
          React Native, JavaScript e TypeScript per creare applicazioni
          scalabili ed eﬃcienti su entrambe le piattaforme. Ho un interesse
          crescente per il web development, il backend e il design delle
          applicazioni. Sempre orientato al miglioramento continuo, sono alla
          ricerca di opportunità che mi permettano di crescere sia
          professionalmente che personalmente. Al di fuori del lavoro, mi
          interessa anche il settore finanziario, dove cerco costantemente di
          ampliare le mie competenze. Il bodybuilding è una passione che mi
          aiuta a coltivare disciplina e resilienza, valori che applico anche
          nel mio approccio professionale. Amo viaggiare, scoprire nuove culture
          e conoscere persone. Inoltre, sono profondamente appassionato del
          settore automotive, nel quale continuo a sviluppare le mie conoscenze
          per rimanere sempre aggiornato sulle ultime innovazion
        </h3>
      </div>
    </div>
  );
}

export default App;
