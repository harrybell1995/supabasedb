import { useState } from 'react';

export default function TacticForm() {
  const [form, setForm] = useState({
    tactic_name: '',
    description: '',
    formation: '',
    owner: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/add-tactic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.status === 200) {
        alert('Tactic added successfully');
        setForm({
          tactic_name: '',
          description: '',
          formation: '',
          owner: ''
        });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="tactic_name"
        value={form.tactic_name}
        onChange={handleChange}
        placeholder="Tactic Name"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="formation"
        value={form.formation}
        onChange={handleChange}
        placeholder="Formation"
        required
      />
      <input
        type="text"
        name="owner"
        value={form.owner}
        onChange={handleChange}
        placeholder="Owner"
        required
      />
      <button type="submit">Add Tactic</button>
    </form>
  );
}
