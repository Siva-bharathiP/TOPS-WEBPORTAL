import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function App(){
  return (
    
  <GoogleLogin
  onSuccess={credentialResponse => {
    const credentialResponseDecoded = jwtDecode(
      credentialResponse.credential
    );
    console.log(credentialResponseDecoded);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  />
);
}

export default App;