import React from 'react'
import { useParams } from 'react-router-dom';


const VersionsPdf = () => {

    const { Qid } = useParams();

    return (
        <div> Hellow Hello {Qid}</div>
    )
}

export default VersionsPdf;