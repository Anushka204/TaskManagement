export default function Goal({ goal }) {
  return (
    <li key={goal._id}>
      <h3>{goal.title}</h3>
      <p>{goal.description}</p>
    </li>
  )
}
