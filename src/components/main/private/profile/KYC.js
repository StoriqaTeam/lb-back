
import { connect }            from 'react-redux'
import * as userActions       from './../../../../actions/userActions'
import { bindActionCreators } from 'redux'
import {API_URL, GET_USER}    from './../../../../constants/constantsAPI'

import ReactDOM           from 'react-dom';
import React, {Component} from 'react'
import  {Cookies}         from "react-cookie"
import Popup              from './../../../elements/popup/Popup'
import style              from './style.css'

class KYC extends Component {

  constructor(){
    super()
    this.state = {}
  }

  myCallback(){
    
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.state.addKYC && prevState.addKYC){
      return
    }

    if (this.state.addKYC && !prevState.addKYC){
          let cookies = new Cookies;
          let component = this;
          const createKYCFrame = async () => { 
            let token = await  fetch(`${API_URL}/api/v1/accessToken`, {
              method: 'GET',
              headers: new Headers({
                'X-Auth-Token': cookies.get('token')
              })
            })
            .then(
              res => res.json(),
              err => err
            )
            .then(json => {
              console.log(json)
              return json.token
            })
                      var conf = {
                          "accessToken": token,
                          "user_id": this.props.user.id,
                          "lang": "en",
                          "applicantDataPage": {
                              "enabled": true,
                              "fields": [
                                  {
                                      "name": "firstName",
                                      "required": true
                                  },
                                  {
                                      "name": "lastName",
                                      "required": true
                                  },
                                  {
                                      "name": "email"
                                  }
                              ]
                          },
                          "requiredDocuments": "IDENTITY:PASSPORT,ID_CARD,DRIVERS;SELFIE:SELFIE"
                      };
                      if (!conf.accessToken) {
                        //  alert('Please, provide an access token in query parameters');
                      } else {
                          var id = idensic.init(
                              '#idensic',
                              conf,
                              async function (messageType, payload) {
                                  // idCheck.onReady, idCheck.onResize, idCheck.onCancel, idCheck.onSuccess, idCheck.onApplicantCreated
                                  console.log('[IDENSIC DEMO] Idensic message:', messageType, payload);
                                  // resizing iframe to the inner content size

                                  if (messageType == 'idCheck.onCancel') {
                                     // alert('User canceled the wizard');
                                  }
                                  if (messageType == 'idCheck.onSuccess') {
                                    //  alert('User completed photo verification!');
                                    let user  = await GET_USER(cookies.get('token'))

                                    component.props.getProfile(user.user)
                                  }
                                  if (messageType == 'idCheck.onApplicantCreated') {
                                      var conf = getJsonFromUrl(window.location.href.split('?')[1]);
                                      if(conf.applicantId != payload.applicantId) {
                                          console.log('applicantId = ', payload.applicantId);
                                          conf.applicantId = encodeURIComponent(payload.applicantId);
                                          var newUrl = window.location.href.split('?')[0] + '?' + getUrlFromJson(conf);
                                          window.history.pushState("update applicant Id", "Sum&Substance IFrame Demo", newUrl);
                                      }
                                  }
                              }
                          );
                      }

                      function getJsonFromUrl(url) {
                          function insertIndex(obj,is, value) {
                              if (is.length==1 && value!==undefined)
                                  return obj[is[0]] = value;
                              else if (is.length==0)
                                  return obj;
                              else {
                                  if(!obj[is[0]]) obj[is[0]] = {};
                                  return insertIndex(obj[is[0]],is.slice(1), value);
                              }
                          }
                          var json = {};
                          var params = url.split('&');
                          for(var i = 0; i < params.length; i++) {
                              var param = params[i].split('=');
                              var key = decodeURIComponent(param[0]);
                              var value = decodeURIComponent(param[1]);
                              if(~['true', 'false'].indexOf(value)) {
                                  value = value == 'true';
                              }
                              if(~key.indexOf('.')) {
                                  insertIndex(json, key.split('.'), value);
                              } else {
                                  json[key] = value;
                              }
                          }
                          // convert params to array
                          for(key in json) {
                              if(key == 'includedCountries' || key == 'excludedCountries') {
                                  json[key] = objectValues(json[key]);
                              }

                              if(key == 'createApplicantPage' || key == 'applicantDataPage') {
                                  for(subkey in json[key]) {
                                      if(subkey == 'cryptoCurrencies') {
                                          json[key][subkey] = objectValues(json[key][subkey]);
                                      }
                                      if(subkey == 'fields') {
                                          json[key][subkey] = objectValues(json[key][subkey]);
                                      }
                                  }
                              }
                          }
                          return json;
                      }

                      function objectValues(obj) {
                          return Object.keys(obj).map(function(i) {
                              return obj[i];
                          });
                      }

                      function getUrlFromJson(json, path) {
                          let url = '';
                          if( path == undefined ) path = '';
                          if( path ) path += '.';
                          for(let key in json) {
                              if(json[key] instanceof Object) {
                                  url += getUrlFromJson(json[key], path + key);
                              } else if(json[key]) {
                                  if( url || path ) url += '&';
                                  url += encodeURIComponent(path + key) + '=' + encodeURIComponent(json[key]);
                              }
                          }
                          return url;
                      }

                      function getParameterByName(name, url) {
                          if (!url) url = window.location.href;
                          name = name.replace(/[\[\]]/g, "\\$&");
                          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
                          if (!results) return null;
                          if (!results[2]) return '';
                          return decodeURIComponent(results[2].replace(/\+/g, " "));
                      }

     }

         createKYCFrame()
       }

  }

  render(){
    return ([
      <button className="btn btn--green profile__btn" onClick={()=> this.setState({addKYC: true})}>Pass KYC</button>,
         this.state.addKYC &&
          <Popup closePopup={() => this.setState({addKYC: false})} scrollable>
            <div className="container-login100">
            <div className="wrap-login100 p-l-25 p-r-25 p-t-65 p-b-54">
              <div className='popup__close' onClick={() => this.setState({addKYC: false})}>×</div>

              <div className="login100-form validate-form" >
                <span className="login100-form-title p-b-49">
                  Pass KYC
                </span>
                <div className='text-center'>
                 <div id="idensic"></div>

                </div>  
              </div>   
            </div>    
          </div>                          
        </Popup>
    ])
  }
}


function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions:   bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KYC)

