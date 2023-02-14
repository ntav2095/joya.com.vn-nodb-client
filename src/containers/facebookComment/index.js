import React, { useEffect } from "react";
import "./facebook.css";
export default function FacebookComment(props) {
  const { href, width, numberPosts } = props;
  function initFacebookSDK() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    let locale = "vi_VN";
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v15.0", // use version 2.1
      });
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/${locale}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
  useEffect(() => {
    initFacebookSDK();
  },[]);
  return (
    <>
      <hr></hr>
      <div
        className="fb-comments border"
        data-colorscheme="light"
        data-lazy={true}
        data-href={href}
        data-width={width}
        data-numposts={numberPosts ? numberPosts : "5"}
      ></div>
    </>
  );
}
