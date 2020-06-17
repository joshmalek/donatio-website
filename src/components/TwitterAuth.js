import React, { useEffect } from 'react'
import Twitter from 'twitter-lite'

const ManageTwitterAuth = () => {

    return (<div>Manage Twitter Auth!</div>)
}

const TwitterAuth = () => {

    useEffect (() => {

        console.log(`Configuting twitter-lite`)
        const twitterClient = new Twitter({
            consumer_key: 'ElvTnb0OJ3J9DSF9cCI3HZXTl',
            consumer_secret: '807do5gaUWt4q5WPZH4pvPOyGczFtyzRoEktlSbiJ0lFqSXcNM'
        })

        twitterClient.getRequestToken("https://donatio-site.herokuapp.com/twitter")
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    return (<div>Twitter Auth Setup!</div>)
}

export { TwitterAuth, ManageTwitterAuth }