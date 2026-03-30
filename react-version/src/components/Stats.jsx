import { useEffect, useRef, useState } from "react";
import "./Stats.css";

const stats = [
  { target: 8800, label: "Branches across India" },
  { target: 20000, label: "ATMs Nationwide" },
  { target: 90, label: "Million Customers" },
  { target: 19, label: "Countries Presence" },
];

function Counter({ target, started }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(update);
      else setCount(target);
    };
    requestAnimationFrame(update);
  }, [started, target]);

  return <span>{count.toLocaleString("en-IN")}+</span>;
}

export default function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref}>
      <div className="container stats-inner">
        {stats.map(({ target, label }) => (
          <div key={label} className="stat">
            <div className="stat-num">
              <Counter target={target} started={started} />
            </div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
