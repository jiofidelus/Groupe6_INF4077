
$(document).ready(function(){
    const axios = require('axios').default;

    export function sendsms(){
        axios.post(
            'https://api.web2sms237.com/sms/send',
            {
                "sender_id" : "NKGroup4077",
                "phone" : "+237691909859",
                "text": "Bonjour et Bienvenue dans le service de messagerie par defaut de notre site",
                "flash" : false
            }, 
            {
                headers : {
                'Authorization': 'Bearer SqMScE1isugWAjXyD6SU83PFI=', 
                'Content-Type': 'application/json' 
                }
            }
            ).then((data)=>{
            console.log(data)
            })
            .catch((error)=>{
            console.log(error);
            });
    }

});  