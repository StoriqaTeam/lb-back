// html skeleton provider
function template(title, state = {}, content = "", hostname){
  console.log(hostname == 'luckyblock' || hostname == 'localhost')
  let  scripts =  (hostname == 'luckyblock' || hostname == 'localhost') 
    ? ` <script>
         window.__STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/assets/client.js"></script>
      `
      : ``
  let page = `<!DOCTYPE html>
              <html lang="ru" prefix="og: http://ogp.me/ns#">
              <head>
                <meta charset="utf-8">
                <title> ${title} </title>

                  <meta name="description" content="Lucky Block">
                  <meta name="author" content="mishanya">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                  <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">                  
                    <link rel="stylesheet" type="text/css" href="/assets/src/stylesheets/client.css">                                   
                 

                  <meta property="og:url"          content="https://lb-front.stq.cloud" />
                  <meta property="og:type"         content="website" />
                  <meta property="og:title"        content="Lucky Block" />
                  <meta property="og:description"  content="Lucky Block - the unique blockchain quiz" />
                  <meta property="og:image"        content="https://blokboek.net/wp-content/uploads/2017/09/loterij-300x200.jpg"> <script src="https://widget.cloudpayments.ru/bundles/cloudpayments"></script>  

    <script >
        
(function (window) {

  var api_key, oauth_token, request_url, popup;
  var authorize_url = 'https://api.twitter.com/oauth/authenticate?oauth_token=';

  function init(options) {
    api_key = options.api_key;
    request_url = options.request_url;
  }

  function closePopup() {
    if (popup && !popup.closed) {
      popup.close();
    }
  }

  function getUrlQueryObject(query_string) {
    var vars = {}, hash;
    if (!query_string) {
      return false;
    }
    var hashes = query_string.slice(1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars[hash[0]] = hash[1];
    }
    return vars;
  }

  function sendError(message, callback) {
    var response = {
      success: false,
      message: message || 'Some Error Occurred'
    };
    if (typeof callback === 'function') {
      callback(response);
    }
  }

  function getOAuthToken(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status === 0) {
          return callback('Internet Disconnected/Connection Timeout')
        }

        try {
          var response = JSON.parse(this.response);
          callback(null, response);
        } catch (error) {
          callback(error.message);
        }
        return;
      }
    };
    xhr.open("GET", request_url, true);
    xhr.send();
  }

  function authorize(callback) {
    if (!popup) {
      return callback('Popup Not initialized');
    }
    popup.location.href = authorize_url + oauth_token;
    var wait = function () {
      setTimeout(function () {
        return popup.closed ? callback(null, getUrlQueryObject(popup.location.search)) : wait();
      }, 25);
    };
    wait();
  }

  function connect(callback) {
    if (!request_url) {
      return sendError('Request URL not provided', callback);
    }
    //Open a blank popup
    popup = window.open(null, '_blank', 'height=400,width=800,left=250,top=100,resizable=yes', true);
    //Get an oauth token from the callback url
    getOAuthToken(function (error, response) {
      if (error) {
        closePopup();
        return sendError(error, callback);
      }

      if (!response.success) {
        closePopup();
        return sendError(response.message, callback);
      }
      //Set the OAuth1 Token
      oauth_token = response.oauth_token;
      //Ask the user to authorize the app;
      authorize(function (error, response) {
        if (error) {
          closePopup();
          return sendError(error, callback);
        }
        if (!response || !response.oauth_token) {
          closePopup();
          return sendError('OAuth Token not Found', callback);
        }

        //Check if the oauth-token obtained in authorization, matches the original oauth-token
        if (response.oauth_token !== oauth_token) {
          return sendError('Invalid OAuth Token received from Twitter.', callback);
        }

        callback({
          success: true,
          oauth_token: response.oauth_token,
          oauth_verifier: response.oauth_verifier
        });
      });
    });
  }

  window.onload = function twitter() {
    if (typeof window.twitterInit == 'function') {
      window.twitterInit();
    }
  };

  window.twttr = {
    init: init,
    connect: connect
  };
})(window)




          window.twitterInit = twitterInit;
          function twitterInit() {
                  twttr.init({
                      api_key: '1018462374783832065',
                      request_url: window.location.origin + '/tw'
                  });
          }

          function displayAuthorizeSection(text) {
              /*document.getElementById('authorize').innerHTML = text;
              document.getElementById('access-section').style = null;*/
          }

          function displayProfileSection(text) {
             /* document.getElementById('profile-section').style = null;
              document.getElementById('access').innerHTML = text;*/
          }

          var request = {};

          function twitter(event) {
              console.log("twitter is called");
              twttr.connect(function (response) {
                  console.log('response');
                  console.log(response);
                  if (response.success) {
                      request = response;
                  } else {
                      console.log("Twitter Login Error");
                  }
                  displayAuthorizeSection(JSON.stringify(response));
              })
          }

          function twitterAccess() {
              var xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function () {
                  if (this.readyState == 4) {
                      if (this.status === 0) {
                          displayProfileSection('Internet Disconnected/Connection Timeout');
                      }
                      var info;
                      try {
                          info = this.response;
                      } catch (error) {
                          info = error.message;
                      } finally {
                          displayProfileSection(info);
                      }
                      return;
                  }
              };
              xhr.open("POST", "http://localhost:3022/access_token", true);
              xhr.setRequestHeader("Content-type", "application/json");
              xhr.send(JSON.stringify(request));
          }

          function twitterProfile() {
              var xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function () {
                  if (this.readyState == 4) {
                      if (this.status === 0) {
                          document.getElementById('profile').innerHTML = 'Internet Disconnected/Connection Timeout';
                      }
                      var info;
                      try {
                          info = this.response;
                      } catch (error) {
                          info = error.message;
                      } finally {
                          document.getElementById('profile').innerHTML = info;
                      }
                      return;
                  }
              };
              xhr.open("GET", "/profile", true);
              xhr.setRequestHeader("Content-type", "application/json");
              xhr.send();
          }
      </script>

              </head>
              <body>
                 <div id="app" >
                    ${content}
                 </div>

               ${scripts}

          
              </body>

  <script key='script'>
        window.fbAsyncInit = function() {
          FB.init({
            appId      : 208605113193116,
            cookie     : true,
            xfbml      : true,
            version    : 'v2.8'
          });
            
          FB.AppEvents.logPageView();   
            
        };

        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "https://connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
      </script>

        <div id="fb-root"></div>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : 208605113193116,
      xfbml      : true,
      version    : 'v2.8'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
              
	     </html>
              `;

  return page;
}

module.exports = template;
/* не подключаем React на странице кэшированной  в гуглеб см. строку 45 */
