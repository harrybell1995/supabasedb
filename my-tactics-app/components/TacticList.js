import { useState, useEffect } from 'react';

const TacticList = () => {
  const [tactics, setTactics] = useState([]);

  useEffect(() => {
    const fetchTactics = async () => {
      const res = await fetch('/api/get-tactics');
      const data = await res.json();
      if (res.status === 200) {
        setTactics(data);
      } else {
        console.error(data.error);
      }
    };
    fetchTactics();
  }, []);

  return (
    <div>
      <h2>All Tactics</h2>
      <ul>
        {tactics.map((tactic) => (
          <li key={tactic.id}>{tactic.tactic_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TacticList;
