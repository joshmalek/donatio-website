import React, { useEffect } from 'react'
import Twitter from 'twitter-lite'
import axios from 'axios'
import QueryString from 'query-string'

const TwitterAuthCallback = () => {

    useEffect(() => {
        // process the oauth_token & oauth_verifier in the
        // url pararms.

        let parsed_params = QueryString.parse(window.location.search)

        axios.post("http://localhost:4000/graphql", {
            'query': `query { processTwitterAuth (oauth_token: "${parsed_params.oauth_token}", oauth_verifier: "${parsed_params.oauth_verifier}") { oauth_token, oauth_token_secret } }`
        })
        .then(res => {
            console.log(`Twitter API returned:`)
            console.log(res)
        })
        .catch(err => {
            console.log(`Error making Twitter API call`)
            console.log(err)
        })

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