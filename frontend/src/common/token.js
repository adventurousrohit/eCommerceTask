import Cookies from "js-cookie"

export function setTokenCookie(token) {
    Cookies.set('token', token, { expires: 30 });
}

export function getTokenCookie() {
    return Cookies.get('token');
}

export function removeTokenCookie(){
    return Cookies.remove('token')
}

export function FormatPrice({price}) {
    return  Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 2,
        }).format(price / 100);
  
  }