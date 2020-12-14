import React, {useState} from 'react'


const Role = (props)=>{
    const {dialogOpen,setDialogOpen,SelectedItem,SelectedItemIndex}=props
    return(
        <div>
    <form>
        <input text='SelectedItem' placeholder='Email' name='SelectedItem'/>
    </form>

        </div>
    )

}

export default Role;