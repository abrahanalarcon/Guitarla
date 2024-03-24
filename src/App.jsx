import { useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  const MAX_ITEMS = 5
  // const MIN_ITEMS = 1  i didn't put on the function because is not necesary

  function addToCart(item){
    const itemExits = cart.findIndex(guitar => guitar .id === item.id)
    if (itemExits >= 0){
      if(cart[itemExits].quantity >= MAX_ITEMS) return
        const updatedCart = [...cart]
        updatedCart[itemExits].quantity++
        setCart(updatedCart)
    }else{
      item.quantity = 1
      setCart([...cart, item])
    
    }
  
  }

  function removeFromCart(id){
   setCart(prevCart => prevCart.filter(guitar => guitar.id !==id))
  }

  function decreaseQuantity(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > 1) {
        return{
         ...item,
         quantity: item.quantity - 1
       
       }
     }
     return item
   })
   setCart(updatedCart)
  }
  function increaseQuantity(id){
     const updatedCart = cart.map( item => {
       if(item.id === id && item.quantity < MAX_ITEMS) {
         return{
          ...item,
          quantity: item.quantity + 1
        
        }
      }
      return item
    })
    setCart(updatedCart)
  }

 

  return (
    <>
     <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        
        
     />
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => (
                <Guitar
                   key={guitar.id} 
                   guitar={guitar} // Aquí se pasa el prop guitar al componente Guitar
                   setCart={setCart}
                   addToCart={addToCart}
                />
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados  Moises Alarcon</p>
        </div>
    </footer>

     
    </>
  )
}

export default App
