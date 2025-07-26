
let banners = []

export default function handler(req, res) {
  if (req.method === 'POST') {
    banners.push(req.body)
    res.status(200).json({ ok: true })
  } else {
    res.status(200).json(banners)
  }
}
