
import {Cookies}            from "react-cookie"


 const  getCodeFromUrl = function( prop, separator = '#' )  {
	  var params = {};
	  var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( separator ) + 1 ) );
	  var definitions = search.split( '&' );

	  definitions.forEach( function( val, key ) {
	      var parts = val.split( '=', 2 );
	      params[ parts[ 0 ] ] = parts[ 1 ];
	  } );

	  return ( prop && prop in params ) ? params[ prop ] : null;
	}
	function openSocAuthModal(name, url, config = null) {
		config = config || "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"
		return window.open(url, name, config)
	}
	const  fbAppId =  208605113193116

const addOneYear = () => {
   let date = new Date()
   date.setFullYear(date.getFullYear() + 1)
   return date
}


const setTokenCookie = (token) => {
	let cookies = new Cookies
	return token && cookies.set('token', token, {path: '/', expires: addOneYear()})
}
const copyToClipboard = (id) => {
	if (document.selection) { 
	    var range = document.body.createTextRange();
	    range.moveToElementText(document.getElementById(id));
	    range.select().createTextRange();
	    document.execCommand("copy"); 

	} else if (window.getSelection) {
	    var range = document.createRange();
	     range.selectNode(document.getElementById(id));
	     window.getSelection().addRange(range);
	     document.execCommand("copy");
	}
}

const getProps = (prop, props) => {

	if (props[prop] || props[prop] === 0) {
		return props[prop]
	} 

	if (typeof(window) != 'undefined' && window.__STATE__ && (window.__STATE__[prop] || window.__STATE__[prop]  === 0)) {
		let renderedProp =  window.__STATE__[prop]
		delete window.__STATE__[prop]
		return renderedProp
	}

	return null
}

export  {getCodeFromUrl, openSocAuthModal, fbAppId, addOneYear, copyToClipboard, setTokenCookie, getProps}