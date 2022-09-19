import React from 'react'

import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
  } from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
  } from "react-share";

  import './share.css'

const Share = ({url}) => {
  return (
    <div className='shareIconsB'>
         <div className='shareIconRow'>
        <FacebookShareButton 
            url={`${url}`}
            title="Check out this iHateReading custom repository "
        >
          <FacebookIcon logoFillColor='White' round={true} size={40} />
        </FacebookShareButton>
    </div>
  <div className='shareIconRow'>
        <LinkedinShareButton 
            url={`${url}`}
            title="Check out this iHateReading custom repository "
        >
          <LinkedinIcon logoFillColor='White' round={true} size={40} />
        </LinkedinShareButton>
    </div>
    <div className='shareIconRow'>
        <InstapaperShareButton 
            url={`${url}`}
            title="Check out this iHateReading custom repository "
        >
          <InstapaperIcon logoFillColor='White' round={true} size={40} />
        </InstapaperShareButton>
    </div>
    <div className='shareIconRow'>
        <HatenaShareButton 
            url={`${url}`}
            title="Check out this iHateReading custom repository "
        >
          <HatenaIcon logoFillColor='White' round={true} size={40} />
        </HatenaShareButton>
    </div>



    <div className='shareIconRow'>
        <EmailShareButton 
            url={`${url}`}
            title="Check out this iHateReading custom repository "
        >
          <EmailIcon logoFillColor='White' round={true} size={40} />
        </EmailShareButton>
    </div>
    <div className='shareIconRow'>
        <LineShareButton 
            url={`${url}`}
            title="Check out this iHateReading custom repository "
        >
          <LineIcon logoFillColor='White' round={true} size={40} />
        </LineShareButton>
    </div>
    <div className='shareIconRow'>
        <WhatsappShareButton 
            url={`${url}`}
            title="Check out this iHateReading custom repository "
        >
          <WhatsappIcon logoFillColor='White' round={true} size={40} />
        </WhatsappShareButton>
    </div>
    <div className='shareIconRow'>
        <LivejournalShareButton 
            url={`${url}`}
            title="Check out this iHateReading custom repository "
        >
          <LivejournalIcon logoFillColor='White' round={true} size={40} />
        </LivejournalShareButton>
    </div>
 

    </div>
  )
}

export default Share