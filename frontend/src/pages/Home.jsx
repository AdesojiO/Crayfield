import Hero from '../components/home/Hero'
import Bestsellers from '../components/home/Bestsellers'
import WhyCrayfield from '../components/home/WhyCrayfield'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testimonials'
import WholesaleStrip from '../components/home/WholesaleStrip'
import RecipeCards from '../components/home/RecipeCards'

export default function Home() {
  return (
    <>
      <Hero />
      <Bestsellers />
      <WhyCrayfield />
      <HowItWorks />
      <Testimonials />
      <WholesaleStrip />
      <RecipeCards />
    </>
  )
}
