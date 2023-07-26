import axios from 'axios';
import buildClient from '../api/build-client'

export default function LandingPage({ currentUser }) {
  return <h1>Landing Page</h1>;
}

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const {data} = await client.get('/api/users/currentuser')
  return data
};
