import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'

export default function Error() {
    return (
        <Hero>
            <Banner title="404" subtitle='page not found'>
                <Link to='/react-beach-resort' className='btn-primary'>
                    return home
                </Link>
            </Banner>
        </Hero>
    )
}
