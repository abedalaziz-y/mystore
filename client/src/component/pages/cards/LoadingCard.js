import React from 'react';
import { Card, Skeleton } from 'antd';


const LoadingCard=({count})=>{

const Cards=()=>{
        let totalCards=[]

        for (let i = 0; i < count; i++) {
           totalCards.push(
               <Card className='col-6 col-md-4 col-lg-3 mt-3' key={i}>
                   <Skeleton active></Skeleton>
               </Card>
           )
            
        }
    return totalCards
}
   
    return <div className='row pb-5'>{Cards()}</div>
    
}



export default LoadingCard