import PizzaList from '../components/PizzaList'
import Featured from '../components/Featured'

const Home = ({data}) => {
  return (
    <>
      <Featured />
      <PizzaList items={data} />
    </>
  )
}

export default Home