import React from 'react';

const Paginado = (props) =>{

    // //Convierto mi array de objeto en un array de 'li'
    // const items = props.items.map((item, index) =>{
    //   return <li key={item.id}> {item.title}</li>  
    // })

return(

    <div>
        <h1>Pagina: {props.Page}</h1>

        <button onClick={props.prevhandler}>Prev</button>
        <button onClick={props.nexthandler}>Next</button>

        {/* <h2>Items:</h2>

        <ul>
            {items}
        </ul>    */}


    </div>
    )
}
export default Paginado;
