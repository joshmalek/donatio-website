import React, { useEffect } from 'react'
import Twitter from 'twitter-lite'
import axios from 'axios'
import qs from 'qs'
import QueryString from 'query-string'

const TwitterAuthCallback = () => {

    useEffect(() => {
        // process the oauth_token & oauth_verifier in the
        // url pararms.

        let parsed_params = QueryString.parse(window.location.search)
        console.log(`Parsed params`)
        console.log(parsed_params)

        // axios({
        //     method: 'POST',
        //     url: 'https://api.twitter.com/oauth/access_token',
        //     data: qs.stringify({
        //         oauth_consumer_key: "ElvTnb0OJ3J9DSF9cCI3HZXTl", // TODO HIDE THIS!
        //         oauth_token: ,
        //         oauth_verifier: 
        //     }),
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        //     }
        // })

    }, []);

    return (<div>Twitter auth callback!</div>)
}

const TwitterAuth = () => {

    useEffect (() => {

        console.log(`Configuting twitter-lite`)
        // const twitterClient = new Twitter({
        //     consumer_key: 'ElvTnb0OJ3J9DSF9cCI3HZXTl',
        //     consumer_secret: '807do5gaUWt4q5WPZH4pvPOyGczFtyzRoEktlSbiJ0lFqSXcNM'
        // })

        // twitterClient.getRequestToken("https://donatio-site.herokuapp.com/twitter")
        // .then(res => {
        //     console.log(res)
        // })
        // .catch(err => {
        //     console.log(err)
        // })

    }, [])

    return (<div>Twitter Auth Setup!</div>)
}

export { TwitterAuth, TwitterAuthCallback }