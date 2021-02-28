import React from 'react'

export const CreateInvoice = () => {
    return (
        <>
            <p>Select client</p>
            <select name="" id="">
                <option value=''>Select</option>
                {props.clients.map(client => 
                <>
                    <option value={client.companyName}>{client.companyName}</option>  
                </>
                )}
            </select>   
    </>         
    )
}
