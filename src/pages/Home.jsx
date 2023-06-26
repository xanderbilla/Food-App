import PizzaList from '../components/PizzaList'
import Featured from '../components/Featured'

const Home = ({ data }) => {
  const limit = data.slice(0, 6);
  return (
    <>
      <Featured />
      <PizzaList items={limit} />
    </>
  )
}

export default Home
