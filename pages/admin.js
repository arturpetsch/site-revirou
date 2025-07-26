
import { useState, useEffect } from 'react'

export default function Admin() {
  const [banners, setBanners] = useState([])
  const [form, setForm] = useState({ title: '', url: '', image: '' })

  async function loadBanners() {
    const res = await fetch('/api/banners')
    const data = await res.json()
    setBanners(data)
  }

  useEffect(() => {
    loadBanners()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    await fetch('/api/banners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setForm({ title: '', url: '', image: '' })
    loadBanners()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Painel do Afiliado</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Link" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
        <input placeholder="URL da imagem" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {banners.map((b, i) => (
          <li key={i}><a href={b.url}><img src={b.image} width="200" alt={b.title} /></a></li>
        ))}
      </ul>
    </div>
  )
}
