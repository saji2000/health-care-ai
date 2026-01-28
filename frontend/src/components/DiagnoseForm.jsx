import { useState } from 'react'

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  row: { display: 'flex', gap: 12 },
  field: { display: 'flex', flexDirection: 'column', flex: 1 },
  label: { fontSize: 14, fontWeight: 600, marginBottom: 4 },
  input: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    fontSize: 14,
  },
  textarea: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    fontSize: 14,
    minHeight: 80,
    resize: 'vertical',
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    fontSize: 14,
  },
  button: {
    padding: '10px 20px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 4,
  },
}

export default function DiagnoseForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    age: '',
    sex: '',
    weight_lbs: '',
    height_cm: '',
    symptoms: '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({
      age: parseInt(form.age, 10),
      sex: form.sex,
      weight_lbs: parseFloat(form.weight_lbs),
      height_cm: parseInt(form.height_cm, 10),
      symptoms: form.symptoms,
    })
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Age</label>
          <input
            style={styles.input}
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Sex</label>
          <select
            style={styles.select}
            name="sex"
            value={form.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Weight (lbs)</label>
          <input
            style={styles.input}
            type="number"
            name="weight_lbs"
            value={form.weight_lbs}
            onChange={handleChange}
            required
            min="1"
            step="0.1"
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Height (cm)</label>
          <input
            style={styles.input}
            type="number"
            name="height_cm"
            value={form.height_cm}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Symptoms</label>
        <textarea
          style={styles.textarea}
          name="symptoms"
          value={form.symptoms}
          onChange={handleChange}
          required
          placeholder="Describe your symptoms..."
        />
      </div>
      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? 'Analyzing...' : 'Get Diagnosis'}
      </button>
    </form>
  )
}
