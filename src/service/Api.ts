import { Http } from '../gateway/http'

const Api = new Http({
  url: 'http://localhost:3000',
})

export default Api
