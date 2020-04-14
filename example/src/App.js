import React from 'react'

import AdTrace from 'react-adtrace'
import 'react-adtrace/dist/index.css'

const App = () => {
	const config = {
  		app_token: '228fu1ygm2ta',
  		environment: 'production', // or 'sandbox' in case you are testing SDK locally with your web app
  		unique_id: '5056e25a-fh94-223o-b8a2-4ac4e20d48b2', // each web app user needs to have unique identifier,
	}

  return <AdTrace options = {config} />
}

export default App
