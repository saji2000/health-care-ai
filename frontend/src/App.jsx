import { useState } from 'react'
import DiagnoseForm from './components/DiagnoseForm'

const styles = {
  container: {
    maxWidth: 600,
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: 'system-ui, sans-serif',
  },
  title: { textAlign: 'center', marginBottom: 8 },
  disclaimer: {
    textAlign: 'center',
    color: '#b91c1c',
    fontSize: 14,
    marginBottom: 24,
  },
  resultBox: {
    marginTop: 24,
    padding: 20,
    background: '#f0fdf4',
    borderRadius: 8,
    border: '1px solid #bbf7d0',
  },
  error: {
    marginTop: 24,
    padding: 16,
    background: '#fef2f2',
    borderRadius: 8,
    border: '1px solid #fecaca',
    color: '#b91c1c',
  },
}

export default function App() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData) {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(err.error || 'Request failed')
      }
      setResult(await res.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Health Care AI</h1>
      <p style={styles.disclaimer}>
        This is not professional medical advice. Always consult a doctor.
      </p>
      <DiagnoseForm onSubmit={handleSubmit} loading={loading} />
      {error && <div style={styles.error}>{error}</div>}
      {result && (
        <div style={styles.resultBox}>
          <h3>Possible Diagnosis</h3>
          <p>{result.diagnosis}</p>
          {result.remedies && (
            <>
              <h3>Suggested Remedies</h3>
              <p>{result.remedies}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
