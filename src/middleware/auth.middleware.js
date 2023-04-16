

export const authMiddleware = ((req, res, next) =>{
  
  if(req.session.user){
    next()
  } else{
    return res.status(401).send('No autorizado')
  }
})
