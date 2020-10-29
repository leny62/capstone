import dotenv from 'dotenv';
import Response from '../../utils/response';

const response = new Response();

dotenv.config();

export default(req,res,next,errorGot)=>{
    if (errorGot) {   
        if (
            errorGot.details[0].message
            .replace('/', '')
            .replace(/"/g, '')
            .includes('fails to match the required')||
            errorGot.details[0].message
            .replace('/', '')
            .replace(/"/g, '')
            .includes('contain alpha-numeric')
        ) {
          const Error = {
              errorMessage:'Incorrect use of special characters',
              path:errorGot.details[0].path[0],
          };
          response.setError(400, Error);
          return response.send(res);
        }
  
        const Error = errorGot.details[0].message.replace('/', '').replace(/"/g, '');
        response.setError(400, Error);
        return response.send(res);
      }
      
  next();
}