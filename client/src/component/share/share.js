import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import {
    
 LinkOutlined
  
} from '@ant-design/icons';
import {
    EmailShareButton,
    
    FacebookShareButton,FacebookMessengerShareButton,
       LinkedinShareButton,
   
   
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
 
    LinkedinIcon,
   
    RedditIcon,
    TelegramIcon,
  
    TwitterIcon,
  
    WhatsappIcon,
   
} from "react-share";

const ShareLinks=({product})=>{
    const {  title } = product

    const [currnetLink]=useState(window.location.href)
    return(<>
    <div className='container mt-2'> 
    <div className='row'>
        <div className='col'>
            {/* {JSON.stringify(currnetLink)} */}
                    <FacebookShareButton className='smi mt-1 ml-3' url={currnetLink}  >

                        <FacebookIcon size={35} round={true} />
                    </FacebookShareButton>
                    <FacebookMessengerShareButton className='smi mt-1 ml-3' url={currnetLink}  >

                        <FacebookMessengerIcon size={35} round={true} />
                    </FacebookMessengerShareButton>
                    <WhatsappShareButton url={currnetLink}  >

                        <WhatsappIcon className='smi mt-1 ml-3' size={35} round={true} />
                    </WhatsappShareButton>
                    <EmailShareButton url={currnetLink}  >

                        <EmailIcon className='smi mt-1 ml-3' size={35} round={true} />
                    </EmailShareButton>
                    <TwitterShareButton url={currnetLink}  >
                        
                        <TwitterIcon className='smi mt-1 ml-3' size={35} round={true} />
                    </TwitterShareButton>
                    <LinkedinShareButton url={currnetLink}  >
                        
                        <LinkedinIcon className='smi mt-1 ml-3' size={35} round={true} />
                    </LinkedinShareButton>
                    <TelegramShareButton url={currnetLink}  >

                        <TelegramIcon className='smi mt-1 ml-3' size={35} round={true} />
                    </TelegramShareButton>
                    <RedditShareButton url={currnetLink}  >

                        <RedditIcon className='smi mt-1 ml-3' size={35} round={true} />
                    </RedditShareButton>
                    <CopyToClipboard text={window.location.href}
                    >
                        <LinkOutlined onClick={() => toast.success(`${title}  link Copied ,Have Fun`)} style={{ fontSize: '25px', marginLeft: '10px' }} />


                    </CopyToClipboard>
        </div>
    </div>
            {/* {JSON.stringify(currnetLink)} */}
            
    
    
        </div>
     </>)
}

export default ShareLinks