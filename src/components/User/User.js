import React from 'react';
import { useParams } from 'react-router-dom';


export default function User() {
        let { id } = useParams();//this is the if of the user that is public key
        return(
            <div>
                <label>USER : { id } PAGE</label>
            </div>
        );
}
