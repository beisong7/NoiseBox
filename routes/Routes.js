import app from 'express'
const root = '../';
const Route = () =>{

    app.get((caller,controller)=>{
        return root+'/http/controllers/'+controller+'.'+`${caller}`
    })

}

export default Route

