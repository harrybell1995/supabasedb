import { useState } from 'react';

const CreateTactic = () => {
  const [form, setForm] = useState({
    tactic_name: '',
    description: '',
    formation: '',
    owner: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Handling change for ${name} with value: ${value}`);
    setForm({
      ...form,
      [name]: value,
    });
    console.log('Updated form state:', form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submit event triggered');
    console.log('Form data before submission:', form);

    try {
      const res = await fetch('/api/add-tactic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      console.log('Response received from API:', res);

      const data = await res.json();
      console.log('Parsed response data:', data);

      if (res.ok) {
        console.log('Tactic added successfully');
        alert('Tactic added successfully');
        setForm({
          tactic_name: '',
          description: '',
          formation: '',
          owner: '',
        });
        console.log('Form state reset:', form);
      } else {
        console.error('Error response from API:', data.error);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h1>Create a New Tactic</h1>
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
    </div>
  );
};

export default CreateTactic;
