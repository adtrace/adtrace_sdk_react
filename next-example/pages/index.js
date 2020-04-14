import Head from 'next/head'
import dynamic from 'next/dynamic';
const AdTrace = dynamic(() => import('react-adtrace'), { ssr: false })

const options = {
  app_token: '228fu1ygm2ta',
  environment: 'production', // or 'sandbox' in case you are testing SDK locally with your web app
  unique_id: '5056e23a-fh94-223o-b8a2-4ac4e20d48b2', // each web app user needs to have unique identifier,
}

const Home = () => (
  <div className="container">
    <AdTrace options = {options} />
    
  </div>
)

export default Home
