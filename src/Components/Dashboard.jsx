import { Link } from 'react-router-dom'

export default function Dashboard(){
  return (
    <>
      <h2>This is dashboard</h2>
      <Link to="/">back to home</Link>
    </>
  )
}