import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function TacticDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [tactic, setTactic] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchTactic = async () => {
        const res = await fetch(`/api/get-tactic?id=${id}`);
        const data = await res.json();
        if (res.status === 200) {
          setTactic(data);
        } else {
          console.error(data.error);
        }
      };
      fetchTactic();
    }
  }, [id]);

  if (!tactic) return <div>Loading...</div>;

  return (
    <div>
      <h1>{tactic.tactic_name}</h1>
      <p>{tactic.description}</p>
      <p>{tactic.formation}</p>
      <p>{tactic.owner}</p>
    </div>
  );
}
