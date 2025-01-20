import express from 'express'
import notificationRoutes from './routes/notification.route'


const app=express();
const port=3000;
app.use(express.json())

app.use('',notificationRoutes)
app.get('/',(req,res)=>{
    res.json({
        status:'ok'
    })
})
app.listen(port,()=>{
    console.log(`Server is running is on http://localhost:${port}`);
})
export {app};